"use strict";
// CONFIG: WebSite
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function (event) {
    loadExternalContent('content2', 'pages/allbooks.html');
    loadExternalContent('content3', 'pages/addbook.html');
    loadExternalContent('content4', 'pages/searchbook.html');
    loadExternalContent('content5', 'pages/updatebook.html');
    loadExternalContent('content6', 'pages/deletebook.html');
});
function showContent(contentId) {
    var contents = document.querySelectorAll('.content');
    contents.forEach(function (content) {
        content.style.display = 'none';
    });
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}
function loadExternalContent(contentId, url) {
    fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (data) {
        var element = document.getElementById(contentId);
        if (element) {
            element.innerHTML = data;
        }
    })
        .catch(function (error) { return console.error('Error loading external content:', error); });
}
// CONFIG: home.html page
var radios = document.querySelectorAll('input[name="tab"]');
radios.forEach(function (radio) {
    radio.addEventListener('click', function () { return showContent(radio.id.replace('tab', 'content')); });
});
function fetchEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var response, employees, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('books/employees')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    employees = _a.sent();
                    renderEmployees(employees);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching employees: ', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderEmployees(employees) {
    var profilesContainer = document.querySelector('.profiles');
    employees.forEach(function (employee) {
        var profileContainer = document.createElement('div');
        profileContainer.className = 'profile-container';
        profileContainer.innerHTML = "\n        <img src=\"".concat(employee.profile, "\" alt=\"Foto do Funcion\u00E1rio\">\n        <h2>").concat(employee.name, "</h2>\n        <p>Cargo: ").concat(employee.role, "</p>\n        <p>Email: ").concat(employee.email, "</p>\n        <p>Telefone: ").concat(employee.phone, "</p>\n      ");
        profilesContainer.appendChild(profileContainer);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    showContent('content1');
    fetchEmployees();
});
// CONFIG: All Books
function getBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var response, books, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('books/')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    books = _a.sent();
                    renderAllBooks(books);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching books: ', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderAllBooks(books) {
    var booksContainer = document.querySelector('.library');
    booksContainer.innerHTML = '';
    var table = document.createElement('table');
    table.className = "table-books";
    var thead = document.createElement('thead');
    thead.innerHTML = "\n      <tr>\n        <th>Title</th>\n        <th>Pages</th>\n        <th>ISBN</th>\n        <th>Year</th>\n        <th>Author</th>\n        <th>Publisher</th>\n      </tr>\n    ";
    var tbody = document.createElement('tbody');
    books.forEach(function (book) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(book.title, "</td>\n        <td>").concat(book.pages, "</td>\n        <td>").concat(book.isbn, "</td>\n        <td>").concat(book.year, "</td>\n        <td>").concat(book.author, "</td>\n        <td>").concat(book.publisher, "</td>\n      ");
        tbody.appendChild(row);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    booksContainer.appendChild(table);
}
document.addEventListener('DOMContentLoaded', function () {
    getBooks();
});
