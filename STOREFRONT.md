# Aviation RC storefront

The storefront is served by Quarkus at `/`. Its HTML, CSS, JavaScript and local product images live in `src/main/resources/META-INF/resources/`.

Run `./mvnw quarkus:dev`, then visit http://localhost:8080/.

Implemented: responsive catalog, instant search, category filters, price and stock filters, sorting, product details, saved items, localStorage cart, quantity editing and demo order review. Mobile uses a horizontal category selector; price and availability filters are available in the desktop sidebar.

This is a frontend prototype. Products, prices and availability are sample data defined in `shop.js`; they are not synchronized with PostgreSQL. Checkout displays a review only. It does not submit orders or collect payment. Cart and saved selections are stored in the current browser.

Layout and sample product imagery are based on the user-provided reference: https://www.robopixel.in/shop?popular_product=1. The 12 images were downloaded from that site's `images/products/` paths for the prototype. Replace with your own catalog images and verified product data before launching a commercial shop. Google Fonts supplies DM Sans and Space Grotesk; system sans-serif fonts are used if unavailable.

Checks:

```sh
node --check src/main/resources/META-INF/resources/shop.js
node scripts/check-storefront.cjs
./mvnw -o compile quarkus:build
```

To preview the packaged storefront without connecting to the configured database:

```sh
java -Dquarkus.hibernate-orm.active=false -Dquarkus.datasource.active=false -jar target/quarkus-app/quarkus-run.jar
```

Future backend work: product/inventory API, durable orders, customer authentication, payment-provider integration and administration.
