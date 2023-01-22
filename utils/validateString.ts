export default function validateString(str: string): boolean {
  const regExp = new RegExp(`^[^ :;=<>//\\#{}ˆ()'"]*$`); // char not allowed: white space and : ; = < > / \ { } ˆ ( ) ' " #

  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

