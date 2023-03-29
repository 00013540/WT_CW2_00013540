const form = document.getElementById('form');
const name = document.getElementById('name');
const from = document.getElementById('from');
const nutrients = document.getElementById('nutrients');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const image = document.getElementById('image');
const organic = document.getElementById('organic');
const description = document.getElementById('description');
const nameError = document.getElementById('name-error');
const fromError = document.getElementById('from-error');
const nutrientsError = document.getElementById('nutrients-error');
const quantityError = document.getElementById('quantity-error');
const priceError = document.getElementById('price-error');
const imageError = document.getElementById('image-error');
const descriptionError = document.getElementById('description-error');
const deleteBtns = document.querySelectorAll('.delete-btn');

const checkValidityField = (field, errorField) => {
  const isValid = !!field.value.length;
  if (!isValid) errorField.classList.add('visible');
  else errorField.classList.remove('visible');
  return isValid;
};

const checkValidity = () => {
  let isValid = true;
  isValid = checkValidityField(name, nameError);
  isValid = checkValidityField(from, fromError);
  isValid = checkValidityField(nutrients, nutrientsError);
  isValid = checkValidityField(quantity, quantityError);
  isValid = checkValidityField(price, priceError);
  isValid = checkValidityField(image, imageError);
  isValid = checkValidityField(description, descriptionError);
  return isValid;
};

const collectData = () => {
  return {
    productName: name.value.trim(),
    image: image.value.trim(),
    from: from.value.trim(),
    nutrients: nutrients.value.trim(),
    quantity: quantity.value.trim(),
    price: Number(price.value).toFixed(2),
    organic: organic.checked,
    description: description.value.trim(),
  };
};

form?.addEventListener('submit', (e) => {
  const id = e.target.dataset.id;
  e.preventDefault();
  const isValid = checkValidity();
  if (isValid) {
    const data = collectData();
    if (id) {
      fetch(`/product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.status) {
            window.location = '/';
          }
        });
    } else {
      fetch('/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.status) {
            window.location = '/';
          }
        });
    }
  }
});

deleteBtns?.forEach((deleteBtn) => {
  deleteBtn?.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    fetch(`/product/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.status) {
          window.location = '/';
        }
      });
  });
});
