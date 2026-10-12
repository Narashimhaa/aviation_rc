// Lightweight behavior checks without a browser or database.
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
const element = key => {
 if (!elements.has(key)) elements.set(key, {value:key==='#price'?'8000':key==='#sort'?'featured':'',checked:false,style:{},dataset:{},classList:{add(){},remove(){}},setAttribute(){},addEventListener(){},scrollIntoView(){},showModal(){},close(){}});
 return elements.get(key);
};
const context=vm.createContext({Intl,Set,Number,JSON,Date,clearTimeout(){},setTimeout(){},localStorage:{getItem(){return null},setItem(){}},document:{querySelector:element,querySelectorAll(){return []},addEventListener(){},getElementById:element}});
vm.runInContext(readFileSync('src/main/resources/META-INF/resources/shop.js','utf8'),context);
const run = code=>vm.runInContext(code,context);
assert.equal(run('filteredProducts().length'),12);
run("category='Drone Parts'");assert.equal(run('filteredProducts().length'),3);
run('reset()');element('#search').value='NE555';assert.equal(run('filteredProducts()[0].price'),49);
run('reset()');element('#price').value='150';assert.equal(run('filteredProducts().length'),3);
run('reset()');element('#stock').checked=true;assert.equal(run('filteredProducts().length'),11);
run('reset()');element('#sort').value='low';assert.equal(run('filteredProducts()[0].price'),49);
run('reset();add(3);add(3);add(0)');assert.equal(run('subtotal()'),5247);
run('add(11)');assert.equal(run('cart[11]'),undefined);
run('saved.add(7);onlySaved=true');assert.equal(run('filteredProducts().length'),1);
run('cart[3]=99;add(3)');assert.equal(run('cart[3]'),99);
console.log('Passed: catalog, categories, search, price, stock, sorting, cart totals, unavailable items, saved products, quantity limit.');
