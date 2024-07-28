document.addEventListener('DOMContentLoaded', () => {
    const vegIngredients = {
        patties: [
            { name: 'Vegetable patty', price: 80 },
            { name: 'Paneer', price: 80 },
            { name: 'Tofu', price: 80 },
            { name: 'Portobello mushroom', price: 80 },
            { name: 'Cauliflower patty', price: 80 }
        ],
        cheeses: [
            { name: 'Cheddar cheese', price: 20 },
            { name: 'Swiss cheese', price: 20 },
            { name: 'Feta cheese', price: 20 },
            { name: 'Vegan cheese', price: 20 }
        ],
        vegetables: [
            { name: 'Lettuce', price: 20 },
            { name: 'Tomato', price: 20 },
            { name: 'Red onion', price: 20 },
            { name: 'Pickles', price: 20 },
            { name: 'Avocado', price: 20 }
        ],
        condiments: [
            { name: 'Vegan mayo', price: 10 },
            { name: 'Ketchup', price: 10 },
            { name: 'Mustard', price: 10 },
            { name: 'Garlic aioli', price: 10 },
            { name: 'Chipotle mayo', price: 10 }
        ]
    };

    const nonVegIngredients = {
        patties: [
            { name: 'Grilled chicken breast', price: 100 },
            { name: 'Fried chicken breast', price: 100 },
            { name: 'Lamb patty', price: 100 },
            { name: 'Grilled fish fillet', price: 100 },
            { name: 'Spicy chicken patty', price: 100 },
            { name: 'BBQ chicken breast', price: 100 },
            { name: 'Shrimp patty', price: 100 }
        ],
        cheeses: [
            { name: 'Cheddar cheese', price: 20 },
            { name: 'Swiss cheese', price: 20 },
            { name: 'Feta cheese', price: 20 }
        ],
        vegetables: [
            { name: 'Lettuce', price: 20 },
            { name: 'Tomato', price: 20 },
            { name: 'Red onion', price: 20 },
            { name: 'Caramelized onions', price: 20 },
            { name: 'Pickles', price: 20 }
        ],
        condiments: [
            { name: 'Mayo', price: 10 },
            { name: 'Ketchup', price: 10 },
            { name: 'Mustard', price: 10 },
            { name: 'Garlic aioli', price: 10 },
            { name: 'Chipotle mayo', price: 10 },
            { name: 'BBQ sauce', price: 10 }
        ]
    };

    const ingredientButtons = {
        patties: document.getElementById('patties'),
        cheeses: document.getElementById('cheeses'),
        vegetables: document.getElementById('vegetables'),
        condiments: document.getElementById('condiments')
    };

    const ingredientList = document.getElementById('ingredient-list');
    const orderTotalElem = document.getElementById('order-total');
    const billList = document.getElementById('bill-list');
    const billTotalElem = document.getElementById('bill-total');
    const selectedIngredientList = document.getElementById('selected-ingredient-list');

    let selectedIngredients = [];
    let orderTotal = 0;
    let currentStep = 0;
    let currentIngredients = {};

    const steps = ['patties', 'cheeses', 'vegetables', 'condiments'];

    const createButton = (ingredient) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('ingredient-button-container'); // Add a class for styling
    
        const buttonMinus = document.createElement('button');
        buttonMinus.textContent = '-';
        buttonMinus.addEventListener('click', () => removeIngredient(ingredient));
    
        const buttonLabel = document.createElement('span');
        buttonLabel.textContent = `${ingredient.name} - INR ${ingredient.price}`;
    
        const buttonPlus = document.createElement('button');
        buttonPlus.textContent = '+';
        buttonPlus.addEventListener('click', () => addIngredient(ingredient));
    
        buttonContainer.appendChild(buttonMinus);
        buttonContainer.appendChild(buttonLabel);
        buttonContainer.appendChild(buttonPlus);
    
        return buttonContainer;
    };
    

    const addIngredient = (ingredient) => {
        selectedIngredients.push(ingredient);
        orderTotal += ingredient.price;
        updateOrderSummary();
        updateSelectedIngredients();
    };

    const removeIngredient = (ingredient) => {
        const index = selectedIngredients.findIndex((ing) => ing.name === ingredient.name);
        if (index !== -1) {
            selectedIngredients.splice(index, 1);
            orderTotal -= ingredient.price;
            updateOrderSummary();
            updateSelectedIngredients();
        }
    };

    const updateOrderSummary = () => {
        ingredientList.innerHTML = '';
        selectedIngredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.name} - INR ${ingredient.price}`;
            ingredientList.appendChild(listItem);
        });
        orderTotalElem.textContent = `INR ${orderTotal}`;
    };

    const updateSelectedIngredients = () => {
        selectedIngredientList.innerHTML = '';
        selectedIngredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.name} - INR ${ingredient.price}`;
            selectedIngredientList.appendChild(listItem);
        });
    };

    const showCurrentStep = () => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            document.getElementById(step).parentElement.classList.remove('hidden');
            document.getElementById('next-step').classList.remove('hidden');
            if (currentStep > 0) {
                document.getElementById('previous-step').classList.remove('hidden');
            } else {
                document.getElementById('previous-step').classList.add('hidden');
            }
        } else {
            document.querySelector('.ingredients').classList.add('hidden');
            document.querySelector('.order-summary').classList.remove('hidden');
        }
    };

    const showIngredients = (ingredients) => {
        currentIngredients = ingredients;
        Object.keys(ingredients).forEach((category) => {
            ingredientButtons[category].innerHTML = '';
            ingredients[category].forEach((ingredient) => {
                ingredientButtons[category].appendChild(createButton(ingredient));
            });
        });
    };

    document.getElementById('choose-veg').addEventListener('click', () => {
        document.querySelector('.choose-type').classList.add('hidden');
        document.querySelector('.ingredients').classList.remove('hidden');
        showIngredients(vegIngredients);
        showCurrentStep();
    });

    document.getElementById('choose-non-veg').addEventListener('click', () => {
        document.querySelector('.choose-type').classList.add('hidden');
        document.querySelector('.ingredients').classList.remove('hidden');
        showIngredients(nonVegIngredients);
        showCurrentStep();
    });

    document.getElementById('next-step').addEventListener('click', () => {
        currentStep++;
        if (currentStep < steps.length) {
            document.getElementById(steps[currentStep - 1]).parentElement.classList.add('hidden');
        }
        showCurrentStep();
    });

    document.getElementById('previous-step').addEventListener('click', () => {
        currentStep--;
        if (currentStep >= 0) {
            document.getElementById(steps[currentStep + 1]).parentElement.classList.add('hidden');
        }
        showCurrentStep();
    });

    document.getElementById('place-order').addEventListener('click', () => {
        document.querySelector('.order-summary').classList.add('hidden');
        document.querySelector('.bill').classList.remove('hidden');
        billList.innerHTML = '';
        selectedIngredients.forEach((ingredient) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.name} - INR ${ingredient.price}`;
            billList.appendChild(listItem);
        });
        billTotalElem.textContent = `INR ${orderTotal}`;
    });

    document.getElementById('place-new-order').addEventListener('click', () => {
        selectedIngredients = [];
        orderTotal = 0;
        currentStep = 0;
        updateOrderSummary();
        updateSelectedIngredients();
        document.querySelector('.bill').classList.add('hidden');
        document.querySelector('.choose-type').classList.remove('hidden');
    });

    document.addEventListener('DOMContentLoaded', () => {
        const images = [
            'images/burger1.jpg',
            'images/burger2.jpg',
            'images/burger3.jpg',
            'images/burger4.jpg',
            'images/burger5.jpg'
        ];
    
        let currentIndex = 0;
    
        const changeBackgroundImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            document.body.style.backgroundImage = `url(${images[currentIndex]})`;
        };
    
        setInterval(changeBackgroundImage, 1000); // Change image every 3 seconds
    });
    
});
