import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

console.log('====================================================');
console.log('🚀 Comfort Journey: Deploying updates to AWS EC2...');
console.log('====================================================');

const keyPath = path.resolve(process.cwd(), 'ec2-key.pem');
if (!fs.existsSync(keyPath)) {
  console.error('❌ Error: ec2-key.pem not found in project root!');
  process.exit(1);
}

// 1. Ensure latest code is pushed to GitHub
try {
  console.log('\n📦 [1/3] Pushing commits to GitHub (origin/main)...');
  execSync('git push origin main', { stdio: 'inherit' });
} catch (e) {
  console.log('ℹ️  Note: Everything up to date or push skipped.');
}

// 2. Trigger automated build & restart on EC2
try {
  console.log('\n🌐 [2/3] Triggering automated Docker build on EC2 (16.4.32.95)...');
  execSync(
    'ssh -i ec2-key.pem -o StrictHostKeyChecking=accept-new ec2-user@16.4.32.95 "sudo /opt/comfort-journey-website/deploy.sh"',
    { stdio: 'inherit' }
  );
  console.log('\n✅ [3/3] Deployment complete!');
  console.log('🎉 Live on https://www.comfortjourneyy.com and https://www.comfortjourney.in\n');
} catch (err) {
  console.error('\n❌ Deployment encountered an error:', err.message);
  process.exit(1);
}
