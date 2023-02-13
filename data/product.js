const fs = require('node:fs/promises');

const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');

async function readData() {
  const data = await fs.readFile('products.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('products.json', JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.products) {
    throw new NotFoundError('Could not find any products.');
  }
  return storedData.products;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const product = storedData.products.find((ev) => ev.id === id);
  if (!product) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  return product;
}

async function add(data) {
  const storedData = await readData();
  storedData.products.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const index = storedData.products.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  storedData.products[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.products.filter((ev) => ev.id !== id);
  await writeData({ products: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
