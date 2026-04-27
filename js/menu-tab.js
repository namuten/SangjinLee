fetch('data/menu.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('menu-grid');
    const tabs = document.querySelectorAll('.tab-btn');
    let currentCategory = 'galbi';

    function renderMenu(category) {
      const items = data.items.filter(item => item.category === category);
      grid.innerHTML = items.map(item => `
        <div class="menu-card${item.featured ? ' featured' : ''}">
          <div class="menu-card-image">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}" loading="lazy" />`
              : `<div style="width:100%;height:100%;background:#e8e3dc;"></div>`
            }
          </div>
          <div class="menu-card-body">
            <p class="menu-card-name">${item.name}</p>
            ${item.desc ? `<p class="menu-card-desc">${item.desc}</p>` : ''}
            <p class="menu-card-price">
              ${item.price
                ? `${item.price}<small>${item.unit ? ' / ' + item.unit : ''}</small>`
                : '<span class="price-tbd">가격 문의</span>'
              }
            </p>
          </div>
        </div>
      `).join('');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        renderMenu(currentCategory);
      });
    });

    renderMenu(currentCategory);
  });
