const avengersData = {
    'Black Panther': {
        image: 'black.jpg',
        about: 'King T\'Challa of Wakanda is a noble warrior and a brilliant strategist who leads with strength and honor.',
        power: 'Enhanced strength, speed, agility, vibranium suit and advanced Wakandan technology.'
    },
    'Bucky Barnes': {
        image: 'soldier.jpg',
        about: 'Bucky Barnes, once the Winter Soldier, fights to redeem his past and protect his allies.',
        power: 'Super soldier abilities, expert combat skills, and a powerful cybernetic arm.'
    },
    Falcon: {
        image: 'sam.jpg',
        about: 'Sam Wilson is a fearless aerial hero and loyal Avenger who inspires others with his courage.',
        power: 'High-tech flight suit with wings, aerial combat mastery, and tactical leadership.'
    },
    Groot: {
        image: 'iamgroot.jpg',
        about: 'Groot is a gentle but powerful tree-like being and a beloved guardian of the galaxy.',
        power: 'Regeneration, body growth and reshaping, and superhuman durability.'
    },
    'Scarlet Witch': {
        image: 'witch.jpg',
        about: 'Wanda Maximoff is one of the most powerful heroes, driven by emotion and incredible will.',
        power: 'Chaos magic, telekinesis, energy projection, and reality manipulation.'
    },
    'Spider-Man': {
        image: 'spidey.jpg',
        about: 'Peter Parker is a young genius hero who balances everyday life with great responsibility.',
        power: 'Wall-crawling, spider-sense, super strength, agility, and web-based combat.'
    },
    'Star-Lord': {
        image: 'lord.jpg',
        about: 'Peter Quill is a witty space adventurer and leader of the Guardians of the Galaxy.',
        power: 'Skilled marksman, tactical improvisation, and advanced alien gear.'
    },
    'Doctor Strange': {
        image: 'strange.jpg',
        about: 'Stephen Strange is a master sorcerer and protector of Earth from mystical threats.',
        power: 'Mystic arts, dimensional travel, magical shields, and time-related spell mastery.'
    },
    Mantis: {
        image: 'mantis.jpg',
        about: 'Mantis is a compassionate empath who supports the team with calm focus and unique abilities.',
        power: 'Empathy, emotional manipulation, and sleep-inducing touch.'
    },
    Drax: {
        image: 'drax.jpg',
        about: 'Drax is a fearless and powerful warrior with unmatched determination in battle.',
        power: 'Superhuman strength, durability, and expert close-range combat.'
    }
};

function loadAvengerDetails() {
    const params = new URLSearchParams(window.location.search);
    const avengerName = params.get('name');
    const avenger = avengersData[avengerName];

    if (!avenger) {
        document.getElementById('detailTitle').textContent = 'Avenger Not Found';
        document.getElementById('detailName').textContent = 'Unknown Avenger';
        document.getElementById('detailAbout').textContent = 'Please return to the main page and select a valid Avenger.';
        document.getElementById('detailPower').textContent = 'Unknown';
        document.getElementById('detailImage').src = 'thanos.jpg';
        document.getElementById('detailImage').alt = 'Unknown Avenger';
        return;
    }

    document.title = `${avengerName} | Avenger Details`;
    document.getElementById('detailTitle').textContent = avengerName.toUpperCase();
    document.getElementById('detailName').textContent = avengerName;
    document.getElementById('detailAbout').textContent = avenger.about;
    document.getElementById('detailPower').textContent = avenger.power;
    document.getElementById('detailImage').src = avenger.image;
    document.getElementById('detailImage').alt = avengerName;
}

loadAvengerDetails();
