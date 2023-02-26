function isValidText(value) {
  return value && value.trim().length > 0;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== 'Invalid Date';
}

function isValidImageUrl(value) {
  return value && value.startsWith('http');
}

function isValidPrice(value) {
  return !isNaN(value) && value !== 'Invalid price';
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidPrice = isValidPrice;
