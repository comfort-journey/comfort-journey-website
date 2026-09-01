import { TOURS_DATA } from '../src/data/toursData.js';

console.log('Total packages:', TOURS_DATA.length);
const intl = TOURS_DATA.filter(t => t.category === 'International Tours' || (t.country && t.country !== 'India'));
console.log('\n--- INTERNATIONAL PACKAGES (' + intl.length + ') ---');
intl.forEach((t, idx) => {
  console.log(`${idx + 1}. [Country: ${t.country} | City: ${t.city} | Loc: ${t.location}] -> Name: "${t.name}" (ID: ${t.id})`);
});

const nat = TOURS_DATA.filter(t => t.category === 'National Tours' || t.country === 'India');
console.log('\n--- SAMPLE NATIONAL PACKAGES (First 10 of ' + nat.length + ') ---');
nat.slice(0, 10).forEach((t, idx) => {
  console.log(`${idx + 1}. [State: ${t.state} | City: ${t.city} | Loc: ${t.location}] -> Name: "${t.name}" (ID: ${t.id})`);
});
