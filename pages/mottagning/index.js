import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/mottagning/mottagning.module.css";

import FeedItem from "../../components/mottagning/FeedItem";

// Innehållet på mottagningssidan kan kommas åt via klienten (utöver github)
// Därför ska inget känsligt innehåll vara inkodat här
export default function Mottagning({ loggedIn, _posts }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(loggedIn);
  const [posts, setPosts] = useState(_posts);

  const redirectUrl = router.query.url;

  const checkPassword = async () => {
    setLoading(true);
    const res = await fetch("/api/mottagning-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "password", password }),
    });

    if (res.status !== 200) {
      res.json().then((data) => {
        console.error(data.error);
      });
      if (res.status === 429) {
        setError("För många försök, försök igen senare");
      } else if (res.status === 401) {
        setError("Fel lösenord");
      } else {
        console.log(res);
        setError("Något gick fel");
      }
      setLoading(false);
      return;
    }

    // Om lösenordet är rätt (res.status === 200) visas välkomst komponenten om
    // de försökte nå en annan sida omdirigeras användaren till den sidan
    if (redirectUrl) {
      router.push(`/mottagning/${redirectUrl}`);
    } else {
      setShowMenu(true);
      const mottagning_key = await res.json().then((data) => data.mottagning_key);
      const _posts = await getKeyResponse(mottagning_key);
      setPosts(_posts);
    }
    setLoading(false);
  };

  return (
    <div id="contentbody">
      <h1>Välkommen till Mottagningssidan</h1>
      <p>
        Denna sidan är till för alla nyantagna som deltar eller funderar på att delta i
        mottagningen. Här kommer aktuell information läggas upp kontinuerligt under mottagningen.
      </p>
      <p>
        Är du nyantagen? Du kommer få mer information via mail inom kort. Om du inte har fått något
        mail hör av dig till{" "}
        <a href="mailto:mottagningen@cl-sektionen.se">mottagningen@cl-sektionen.se</a>.
      </p>
      <p>För att komma åt mottagningssidan behöver skriva in ditt hemliga kodord.</p>

      {!showMenu && (
        <div id={styles.loginPanel}>
          <h2>Ditt kodord</h2>
          <div>
            {error && <p className="">{error}</p>}
            {loading && <p className="">Laddar...</p>}
            <div className={`${styles.inputGroup}`}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="btn" onClick={checkPassword}>
                Logga in
              </button>
            </div>
          </div>
        </div>
      )}
      {showMenu && (
        <div className={styles.wrapper}>
          <div className={styles.welcomePanel}>
            <div>
              <h2>Välkommen till årets mottagning!</h2>
              <p>
                Under de olika flikarna hittar du information och resurser som rör årets mottagning.
                I flödet nedanför kommer information komma ut löpande. Så håll utkik där för
                schemaändringar, anmälningsformulär och övrig viktig information.
              </p>
              <p>Saknar du något på sidan? Säg till en bästis eller annan mottagare.</p>
            </div>
            <div className={styles.nav}>
              <Link href={"mottagning/schema"}>Schema</Link>
              <Link href={"mottagning/bilder"}>Bilder</Link>
              <Link href={"mottagning/info"}>Info</Link>
              <Link href={"mottagning/kontakt"}>Kontakt</Link>
            </div>
          </div>
          <div className={styles.feedWrapper}>
            <h2>Nyheter/Information</h2>
            <div className={styles.feed}>
              {posts && posts.map((item, index) => <FeedItem key={index} item={item} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Kollar om användaren har en mottagning_key och om den stämmer
  // Körs server side dvs NEXT_PUBLIC_MOTTAGNING_KEY exponeras inte
  const mottagning_key = context.req.cookies["mottagning_key"];

  let loggedIn = mottagning_key === process.env.NEXT_PUBLIC_MOTTAGNING_KEY;

  var posts = [];
  if (loggedIn) {
    try {
      posts = await getKeyResponse(mottagning_key);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      loggedIn,
      _posts: posts,
    },
  };
}

function getKeyResponse(key) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/mottagning-password", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "mottagning_key": key,
      },
    });

    if (res.status !== 200) {
      reject(res);
    }

    try {
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
      }
      let posts = [];
      if (data.posts) {
        posts = data.posts.sort((a, b) => b.publishDate._seconds - a.publishDate._seconds);
      }
      resolve(posts);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
