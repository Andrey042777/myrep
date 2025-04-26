document.getElementById('animalForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const animalName = document.getElementById('animalName').value.trim();
        const animalType = document.getElementById('animalType').value;
        console.log(animalName)
        console.log(animalType)
        if (!animalName) {
            alert('Пожалуйста введите название животного!')
            return;
        }
        const newAnimalItem = document.createElement('li')
        newAnimalItem.textContent = animalName;
        const emoji = document.createElement('span');
        emoji.classList.add('emoji');
        if (animalType === "herbivore") {
            emoji.textContent = "🌿";
            document.getElementById('herbivoreList').appendChild(newAnimalItem);
        }
        else if (animalType === "carnivore") {
            emoji.textContent = "🥩";
            document.getElementById('carnivoreList').appendChild(newAnimalItem);
        }
        newAnmalItem.appendChild(emoji);

        document.getElementById('animalName').value = '';
        
    });