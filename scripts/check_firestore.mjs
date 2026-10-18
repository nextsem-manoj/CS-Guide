import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, limit } from "firebase/firestore";

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

async function main() {
  console.log("Checking users_progress...");
  try {
    const snap = await getDocs(collection(db, "users_progress"));
    console.log(`Found ${snap.docs.length} users_progress docs`);
    snap.docs.forEach((doc) => {
      const d = doc.data();
      console.log(`- ${doc.id}: email=${d.email}, displayName=${d.displayName}, bca_practical=${JSON.stringify(d.bca_practical)}`);
    });
  } catch (err) {
    console.error("Error reading users_progress:", err);
  }

  console.log("\nChecking bca_practical_stories...");
  try {
    const sSnap = await getDocs(collection(db, "bca_practical_stories"));
    console.log(`Found ${sSnap.docs.length} stories docs`);
    sSnap.docs.forEach((doc) => {
      const d = doc.data();
      console.log(`- ${doc.id}: userName=${d.userName}, day=${d.day}, userId=${d.userId}, createdAt=${d.createdAt}, repo=${d.githubRepoUrl}`);
    });
  } catch (err) {
    console.error("Error reading bca_practical_stories:", err);
  }

  process.exit(0);
}

main();
