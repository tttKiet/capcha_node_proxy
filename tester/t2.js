function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) +
          1;
      }
    }
  }

  return matrix[a.length][b.length];
}

function getElementsByXPath(xpath, contextNode) {
  const result = [];
  const nodesSnapshot = document.evaluate(
    xpath,
    contextNode || document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
    result.push(nodesSnapshot.snapshotItem(i));
  }
  return result;
}

function findClosestElement(inputText, elements) {
  let closestElement = null;
  let closestDistance = Infinity;

  elements.forEach((element) => {
    const elementText = element.textContent.trim();
    const distance = levenshtein(inputText, elementText);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = element;
    }
  });

  return closestElement;
}

const inputText = "$resultCap";
const xpath = "//div[contains(@class,'selectOption')]//strong";
const allElements = getElementsByXPath(xpath);

const closestElement = findClosestElement(inputText, allElements);

if (closestElement) {
  console.log("Closest element found:", closestElement);
  closestElement.click();
  console.log("Closest element text content:", closestElement.textContent);
} else {
  console.log("No matching element found.");
  throw new Error("Capcha giải sai.");
}
