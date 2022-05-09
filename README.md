# Projekt na Aplikacje Mobilne

# Instalacja

## 
```bash
git clone https://github.com/Nokiusz/budget-tracker.git
cd budget-tracker
npm install
cd api
npm install
```

# Zbudowanie aplikacji
```bash
cd budget-tracker
npm run build
```
Tak zbudowaną aplikację (folder ```build```) można przenieść do katalogu ```assets``` w strukturze plików android studio

# Uruchamianie API
```bash
cd api
npm run watch
```

# Funkcje zaimplementowane w aplikacji
- node.js express API używające danych z SQLite
- wyświetlenie listy wszystkich wydatków/przychodów,
- dodanie wydatków/przychodów na listę, 
- edycję wydatku/przychodu na liście, 
- usunięcie wydatku/przychodu z listy, 
- wyświetlenie w formie wykresu wydatków z danego miesiąca i/lub kategorii, 
- nadanie wydatkom priorytetu,
- sortowanie wydatków (np. po kategorii/koncie/walucie).
- darkmode, ukrywanie wartości

# REST API:

## Endpointy 

#### TRANZAKCJE
```js
GET    "/api/transactions" => zwraca obiekt zawierający wszystkie tranzakcje
GET    "/api/transactions/:id" => zwraca pojedyńczą tranzakcję o danym id
GET    "/api/transactions/list" => zwraca listę tranzakcji z polami 'id' podmienionymi na odpowiednie wartości z tabel słownikowych
GET    "/api/transactions/list/:id" => zwraca  tranzakcję o danym id z polami 'id' podmienionymi na odpowiednie wartości z tabel słownikowych
POST   "/api/transactions" => dodaje tranzakcje
DELETE "/api/transactions/:id" => usuwa tranzakcje o danym id
PUT    "/api/transactions/:id" => aktualizuje tranzakcje o danym id
```
POST body:
```json
{
    "description":"Test POST",
    "value":3000,
    "categoryId": 2,
    "currencyId": 1,
    "typeId": 2,
    "priorityId": 1,
    "date": "29-04-2022"
}
```

#### TYPY
```js
GET    "/api/types" => zwraca obiekt zawierający wszystkie typy
GET    "/api/types/:id" => zwraca pojedyńczy typ o danym id
```

#### KATEGORIE
```js
GET    "/api/categories" => zwraca obiekt zawierający wszystkie kategorie
GET    "/api/categories/:id" => zwraca pojedyńczą kategorie o danym id
GET    "/api/categories/name/:name" => zwraca pojedyńczą kategorie o danej nazwie
POST   "/api/categories" => dodaje kategorie
DELETE "/api/categories/:id" => usuwa kategorie o danym id
PUT    "/api/categories/:id" => aktualizuje kategorie o danym id
```
POST body:
```json
{
    "name": "test category"
}
```

#### WALUTY
```js
GET    "/api/currencies" => zwraca obiekt zawierający wszystkie waluty
GET    "/api/currencies/:id" => zwraca pojedyńczą walutę o danym id
POST   "/api/currencies/" => dodaje walute
DELETE "/api/currencies/:id" => usuwa walute o danym id
PUT    "/api/currencies/:id" => aktualizuje walute o danym id
```
POST body:
```json
{
    "name": "test",
    "symbol": "t",
    "acronym": "TST"
}
```

#### PRIORYTETY
```js
GET    "/api/priorities" => zwraca obiekt zawierający wszystkie priorytety
GET    "/api/priorities/:id" => zwraca pojedyńczy priorytet o danym id
GET    "/api/priorities/name/:name" => zwraca pojedyńczy priorytet o danej nazwie
```


