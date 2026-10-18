import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBoWw_8QOA_S_UfTRQQcNc-CGLBbctMAQ",
  authDomain: "ignou-study-notes-by-nextsem.firebaseapp.com",
  projectId: "ignou-study-notes-by-nextsem",
  storageBucket: "ignou-study-notes-by-nextsem.firebasestorage.app",
  messagingSenderId: "498697546118",
  appId: "1:498697546118:web:4630ab76b34fcc3d83a407"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LESSON_TITLES = {
  1: "HTML Setup & First Webpage",
  2: "HTML Headings, Paragraphs & Text Formatting",
  3: "HTML Links and Images",
  4: "HTML Semantic Elements & Page Structure",
  5: "HTML Forms & Input Elements",
  6: "HTML Tables & Structured Data",
  7: "HTML Media: Audio and Video",
  8: "HTML Canvas & SVG Introduction",
  9: "HTML Best Practices & Accessibility",
  10: "Milestone: Personal Portfolio in HTML"
};

async function syncAll() {
  console.log("Fetching users_progress...");
  const usersSnap = await getDocs(collection(db, "users_progress"));
  console.log(`Found ${usersSnap.docs.length} users in users_progress`);

  for (const userDoc of usersSnap.docs) {
    const data = userDoc.data();
    const uid = userDoc.id;
    const completedDays = data.bca_practical?.completedDays || [];
    const urls = data.bca_practical?.githubRepoUrls || {};
    const ghUser = data.bca_practical?.githubUsername || "student";
    const name = data.displayName || data.email?.split("@")[0] || "BCA Student";
    const photo = data.photoURL || null;

    console.log(`\nUser ${name} (${uid}): completed days = [${completedDays.join(", ")}]`);

    for (const day of completedDays) {
      const storyId = `${uid}_day_${day}`;
      const title = LESSON_TITLES[day] || `Day ${day} Practical Lesson`;
      const repoUrl = urls[day] || urls[String(day)] || `https://github.com/${ghUser}`;
      const ts = data.bca_practical?.lastUpdated ? new Date(data.bca_practical.lastUpdated).getTime() : Date.now();

      console.log(`  -> Ensuring story ${storyId} (Day ${day}: ${title})...`);
      await setDoc(doc(db, "bca_practical_stories", storyId), {
        userId: uid,
        userName: name,
        userPhoto: photo,
        day: Number(day),
        lessonTitle: title,
        caption: `Completed Day ${day}: ${title} and pushed verified code to GitHub! 🚀 Viva approved.`,
        githubRepoUrl: repoUrl,
        timestamp: data.bca_practical?.lastUpdated || new Date().toISOString(),
        createdAt: ts
      }, { merge: true });
    }
  }

  console.log("\nFinished syncing all stories!");
  process.exit(0);
}

syncAll().catch((err) => {
  console.error("Error syncing stories:", err);
  process.exit(1);
});
