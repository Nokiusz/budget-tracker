# Projekt na Aplikacje Mobilne


# Funkcje zaimplementowane w aplikacji
- node.js express API używające danych z SQLite
-  wyświetlenie listy wszystkich wydatków/przychodów,
- dodanie wydatków/przychodów na listę, 
- edycję wydatku/przychodu na liście, 
-  usunięcie wydatku/przychodu z listy, 
- wyświetlenie w formie wykresu wydatków z danego miesiąca i/lub kategorii, 
- nadanie wydatkom priorytetu,
- sortowanie wydatków (np. po kategorii/koncie/walucie).  

# API:

## Endpointy 

#### TRANZAKCJE
```js
"/api/transactions" => zwraca obiekt zawierający wszystkie tranzakcje
"/api/transactions/:id" => zwraca pojedyńczą tranzakcję o danym id
"/api/transactions/list" => zwraca listę tranzakcji z polami 'id' podmienionymi na odpowiednie wartości z tabel słownikowych

```
#### TYPY
```js
"/api/types" => zwraca obiekt zawierający wszystkie tranzakcje
"/api/types/:id" => zwraca pojedyńczy typ o danym id
```

#### KATEGORIE
```js
"/api/categories" => zwraca obiekt zawierający wszystkie kategorie
"/api/categories/:id" => zwraca pojedyńczą kategorie o danym id
"/api/categories/name/:name" => zwraca pojedyńczą kategorie o danej nazwie
```

#### WALUTY
```js
"/api/currencies" => zwraca obiekt zawierający wszystkie waluty
"/api/currencies/:id" => zwraca pojedyńczą walutę o danym id
```

#### PRIORYTETY
```js
"/api/priorities" => zwraca obiekt zawierający wszystkie priortytety
"/api/priorities/:id" => zwraca pojedyńczy priorytet o danym id
"/api/priorities/name/:name" => zwraca pojedyńczy priorytet o danej nazwie
```


