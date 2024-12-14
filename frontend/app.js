document.addEventListener('DOMContentLoaded', () => {
    loadOSInfo();
    loadFileInfo();
    fetchBalloons();
  });
  
  async function loadOSInfo() {
    try {
      const osInfo = await getOSInfo();
      document.getElementById('os-info-details').innerText = `OS: ${osInfo.platform}, Общая память: ${osInfo.totalMemory}`;
    } catch (error) {
      document.getElementById('os-info-details').innerText = 'Ошибка при загрузке информации о ОС.';
    }
  }
  
  async function loadFileInfo() {
    try {
      const fileInfo = await getFile();
      console.log(fileInfo);
      document.getElementById('file-info-details').innerText = fileInfo.text;
    } catch (error) {
      document.getElementById('file-info-details').innerText = 'Ошибка при загрузке информации о файле.';
    }
  }

  function getSize(size) {
    switch(size) {
        case 'small':
            return 50;
        case 'medium':
            return 80;
        case 'large':
            return 120;
        default:
            return 80;
    }
}

function getContrastColor(backgroundColor) {
    // Убираем # если он есть
    if (backgroundColor[0] === '#') {
        backgroundColor = backgroundColor.slice(1);
    }

    // Преобразуем в RGB
    const r = parseInt(backgroundColor.substr(0, 2), 16);
    const g = parseInt(backgroundColor.substr(2, 2), 16);
    const b = parseInt(backgroundColor.substr(4, 2), 16);

    // Вычисляем контраст
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Если яркость больше 128, выбираем черный текст, иначе белый
    return brightness > 128 ? 'black' : 'white';
}

function genRandCoords(container){
    const containerRect = container.getBoundingClientRect(); 
    const maxLeft = containerRect.width; // Максимальная X
    const maxTop = containerRect.height; // Максимальная Y
    
    // Генерация случайных координат в пределах контейнера
    const randomLeft = Math.random() * maxLeft + containerRect.left; // X
    const randomTop = Math.random() * maxTop + containerRect.top; // Y
    return [`${randomLeft}px`, `${randomTop}px`];
}

function setAttributes(balloonElement, balloon){
    balloonElement.setAttribute('data-id', balloon.id); 
    balloonElement.style.backgroundColor = balloon.color;
    balloonWrapper.style.position = 'absolute'; 
    balloonElement.style.width = `${getSize(balloon.size) * 0.8}px`; 
    balloonElement.style.height = `${getSize(balloon.size)}px`;
}


function addMouseMoveListeners(balloonWrapper, tooltip){
    balloonWrapper.appendChild(tooltip);
    const wrapperRect = balloonWrapper.getBoundingClientRect();

    balloonWrapper.addEventListener('mousemove', (event) => {
        tooltip.style.left = `${wrapperRect.x}px`; 
        tooltip.style.top = `${wrapperRect.y}px`;
    });

    balloonWrapper.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });

    balloonWrapper.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}

function createBalloon(balloon){
    const balloonWrapper = document.createElement('div');
    balloonWrapper.classList.add('balloon-wrapper');
    const balloonElement = document.createElement('div');
    balloonElement.classList.add('balloon');

    setAttributes(balloonElement, balloon);
    const container = document.getElementById('balloons-container');

    balloonWrapper.style.left, balloonWrapper.style.top = genRandCoords(container);

    const textColor = getContrastColor(balloon.color);
    const nameElement = document.createElement('span');
    nameElement.classList.add('balloon-name');
    nameElement.innerText = balloon.name;
    nameElement.style.color = textColor; 

    balloonElement.appendChild(nameElement);

    const ropeElement = document.createElement('div');
    ropeElement.classList.add('rope');

    balloonElement.addEventListener('click', async () => {
        await blowBalloon(balloon);
    });

    balloonWrapper.appendChild(ropeElement);
    balloonWrapper.appendChild(balloonElement);

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = `${balloon.description}`;
    addMouseMoveListeners(balloonWrapper, tooltip);
    
    container.appendChild(balloonWrapper);
};
  
  async function fetchBalloons() {
    try {
        const response = await fetch('http://localhost:3000/api/balloons');
        const balloons = await response.json(); 

        const container = document.getElementById('balloons-container');
        container.innerHTML = ''; 

        balloons.forEach(balloon => createBalloon(balloon));
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
  }

async function submitBalloonForm(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    const name = document.getElementById('balloon-name').value;
    const color = document.getElementById('balloon-color').value;
    const size = document.getElementById('balloon-size').value;
    const description = document.getElementById('balloon-description').value;

    const balloonData = {
        name: name,
        color: color,
        size: size,
        description: description,
    };

    console.log(color);

    try {
        // Отправка POST запроса
        const response = await fetch('http://localhost:3000/api/balloons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(balloonData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Шарик создан:', result);
            createBalloon(result);
        } else {
            console.error('Ошибка при создании шарика:', response.status);
        }
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    }
}

async function deleteBalloon(balloonId) {
    try {
        const response = await fetch(`http://localhost:3000/api/balloons/${balloonId}`, {
        method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Шарик с ID ${balloonId} удален с сервера.`);
            
            const balloonElement = document.querySelector(`[data-id="${balloonId}"]`);
            if (balloonElement) {
                balloonElement.closest('.balloon-wrapper').remove();
            }
        } else {
            console.error(`Ошибка при удалении шарика с ID ${balloonId}`);
        }
    }
    catch (error) {
        console.error('Ошибка при удалении шарика с сервера:', error);
    }
}

async function patchSize(balloonId, newSize){
    try {
        const response = await fetch(`/api/balloons/${balloonId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ size: newSize }),
        });
        if (!response.ok) {
            console.log('Failed to update balloon size');
        }
        const data = await response.json();
        console.log('Balloon size updated:', data);
    }
    catch (error) {
        console.error('Ошибка при удалении шарика с сервера:', error);
    }
}

async function blowBalloon(balloon) {
    console.log(balloon);
    const balloonElement = document.querySelector(`[data-id="${balloon.id}"]`);
    if (balloon.size == 'large') {
        await deleteBalloon(balloon.id);
    }
    else {
        if (balloon.size == 'small') {
            balloonElement.style.width = `${getSize('medium') * 0.8}px`;
            balloonElement.style.height = `${getSize('medium')}px`;
            balloon.size = 'medium';
            await blowBalloon(balloon.id, 'medium');
        }
        else if (balloon.size == 'medium') {
            balloonElement.style.width = `${getSize('large') * 0.8}px`;
            balloonElement.style.height = `${getSize('large')}px`;
            balloon.size = 'large';
            await blowBalloon(balloon.id, 'large');
        } 
    }
}

document.getElementById('balloon-form').addEventListener('submit', submitBalloonForm);