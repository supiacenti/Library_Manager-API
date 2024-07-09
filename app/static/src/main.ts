// CONFIG: WebSite

document.addEventListener('DOMContentLoaded', (event) => {
    loadExternalContent('content2', 'pages/allbooks.html');
    loadExternalContent('content3', 'pages/addbook.html');
    loadExternalContent('content4', 'pages/searchbook.html');
    loadExternalContent('content5', 'pages/updatebook.html');
    loadExternalContent('content6', 'pages/deletebook.html');
});

function showContent(contentId: string): void {
    const contents: NodeListOf<HTMLElement> = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

function loadExternalContent(contentId: string, url: string): void {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(contentId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading external content:', error));
}

// CONFIG: home.html page
const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tab"]');
radios.forEach(radio => {
    radio.addEventListener('click', () => showContent(radio.id.replace('tab', 'content')));
});

async function fetchEmployees() {
    try {
      const response = await fetch('books/employees');
      const employees = await response.json();
      renderEmployees(employees);
    } catch (error) {
      console.error('Error fetching employees: ', error);
    }
  }
  
  function renderEmployees(employees: any[]) {
    const profilesContainer = document.querySelector('.profiles') as HTMLElement;
  
    employees.forEach(employee => {
      const profileContainer = document.createElement('div');
      profileContainer.className = 'profile-container';
  
      profileContainer.innerHTML = `
        <img src="${employee.profile}" alt="Foto do Funcionário">
        <h2>${employee.name}</h2>
        <p>Cargo: ${employee.role}</p>
        <p>Email: ${employee.email}</p>
        <p>Telefone: ${employee.phone}</p>
      `;
  
      profilesContainer.appendChild(profileContainer);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    showContent('content1');
    fetchEmployees();
  });

// CONFIG: All Books

async function getBooks() {
    try {
      const response = await fetch('books/');
      const books = await response.json();
      renderAllBooks(books);
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  }

  function renderAllBooks(books: any[]) {
    const booksContainer = document.querySelector('.library') as HTMLElement;
    booksContainer.innerHTML = '';

    const table = document.createElement('table');
    table.className = "table-books"

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Title</th>
        <th>Pages</th>
        <th>ISBN</th>
        <th>Year</th>
        <th>Author</th>
        <th>Publisher</th>
      </tr>
    `;

    const tbody = document.createElement('tbody');
    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.pages}</td>
        <td>${book.isbn}</td>
        <td>${book.year}</td>
        <td>${book.author}</td>
        <td>${book.publisher}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    booksContainer.appendChild(table);
  }

  document.addEventListener('DOMContentLoaded', () => {
    getBooks();
});


// CONFIG: Add Book

interface BookData {
  isbn: number;
  pages: number;
  title: string;
  year: number;
  author: string;
  publisher: string;
}

function getFormData(): BookData {
  return {
    isbn: Number((document.getElementById("add_isbn") as HTMLInputElement).value),
    pages: Number((document.getElementById("add_pages") as HTMLInputElement).value),
    title: (document.getElementById("add_title") as HTMLInputElement).value,
    year: Number((document.getElementById("add_year") as HTMLInputElement).value),
    author: (document.getElementById("add_author") as HTMLInputElement).value,
    publisher: (document.getElementById("add_publisher") as HTMLInputElement).value
  };
}

function showModal(message: string, isSuccess: boolean) {
  const modal = document.getElementById("modal") as HTMLDivElement;
  const modalMessage = document.getElementById("modal-message") as HTMLParagraphElement;
  const closeButton = document.querySelector(".close-button") as HTMLSpanElement;

  modalMessage.textContent = message;
  modalMessage.className = isSuccess ? 'success' : 'error';
  
  modal.style.display = "block";

  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
}

async function addBooks() {
  const url = 'http://localhost:5002/books/';
  const data = getFormData();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success:', result);
    showModal('Livro cadastrado com sucesso!', true);
  } catch (error) {
    console.error('Error:', error);
    showModal('Erro ao cadastrar o livro.', false);
  }
}