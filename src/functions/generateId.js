const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f' ,'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCase = lowerCase.join('').toUpperCase().split('');
const special = ['-', '/', ':', ',', '_', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function generateId(name, creatorId) {
  let nameArr = name.split('');

  for (let i=0; i<nameArr.length; i++) {
    if (nameArr[i] === ' ') {
      nameArr[i] = "_";
    }

    if (!lowerCase.includes(nameArr[i]) && !upperCase.includes(nameArr[i]) && !special.includes(nameArr[i])) {
      nameArr[i] = '-';
    };
  };

  let creatorArr = creatorId.split('');

  for (let i=0; i<creatorArr.length; i++) {
    if (!lowerCase.includes(creatorArr[i]) && !upperCase.includes(creatorArr[i]) && !special.includes(creatorArr[i])) {
      creatorArr[i] = '-';
    }
  };

  creatorArr.push(Math.floor(Math.random() * 9999).toString());

  return nameArr.concat(creatorArr).join('');
}