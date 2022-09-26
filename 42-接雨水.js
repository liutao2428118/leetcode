
// 动态规则
var trap = function(height) {
  let len = height.length;
  let left = new Array(len).fill(0)
  for(let i = 1; i < len; i++) left[i] = Math.max(left[i - 1], height[i - 1])
  let right = new Array(len).fill(0)
  for(let i = len - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], height[i + 1])

  let res = 0
  for(let i = 0; i < len - 1; i++) {
    let minHe = Math.min(left[i], right[i])
    if(height[i] < minHe) res += minHe - height[i] 
  }
  return res
};

// 单调栈
var trap1 = function(height) {
  let ans = 0;
  const stack = [];
  const n = height.length;
  for (let i = 0; i < n; ++i) {
      while (stack.length && height[i] > height[stack[stack.length - 1]]) {
          const top = stack.pop();
          if (!stack.length) {
              break;
          }
          const left = stack[stack.length - 1];
          const currWidth = i - left - 1;
          const currHeight = Math.min(height[left], height[i]) - height[top];
          ans += currWidth * currHeight;
      }
      stack.push(i);
  }
  return ans;
};

// 双指针 （动态规则 空间复杂度优化）
var trap2 = function(height) {
  let ans = 0;
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  while (left < right) {
      leftMax = Math.max(leftMax, height[left]);
      rightMax = Math.max(rightMax, height[right]);
      if (height[left] < height[right]) {
          ans += leftMax - height[left];
          ++left;
      } else {
          ans += rightMax - height[right];
          --right;
      }
  }
  return ans;
};

var trap3 = function(height) {
  let res = 0;
  for (let i = 1; i < height.length - 1; i++) {
      let left = 0;
      let right = 0;
      for (let j = i; j >= 0; j--) left = Math.max(left, height[j]);
      for (let j = i; j < height.length; j++) right = Math.max(right, height[j]);
      res += Math.min(left, right) - height[i];
  }
  return res;
}

let height = [0,1,0,2,1,0,1,3,2,1,2,1]
debugger
console.log(trap3(height))