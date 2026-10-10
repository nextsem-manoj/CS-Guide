async function test() {
  const res = await fetch('http://localhost:3001/bca/practical/day-1-html-setup-first-webpage/');
  const html = await res.text();
  console.log('HTML length:', html.length);
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    console.log('Main attributes:', html.match(/<main[^>]*>/)?.[0]);
    console.log('First 600 chars of main:', mainMatch[1].slice(0, 600));
  }
}
test().catch(console.error);
