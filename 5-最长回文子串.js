// 中心扩展算法
function longestPalindrome(s) {
  if(s == null || s.length < 1) {
    return ""
  }
  let start = 0, end = 0
  for(let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i)
    let len2 = expandAroundCenter(s, i, i + 1)
    let len = Math.max(len1, len2)
    if(len > end - start) {
      start = i - (len - 1) / 2
      end = i + len / 2
    }
  }
  return s.substring(start, end+1)
}

function expandAroundCenter(s, left, right) {
  while(left >= 0 && right < s.length && s.charAt(left) == s.charAt(right)) {
    --left
    ++right
  }
  return right - left - 1
}

function longestPalindrome1(s) {

  if (s == null || s.length == 0) {
      return "";
  }
  let strLen = s.length;
  let left = 0;
  let right = 0;
  let len = 1;
  let maxStart = 0;
  let maxLen = 0;

  for (let i = 0; i < strLen; i++) {
      left = i - 1;
      right = i + 1;
      while (left >= 0 && s.charAt(left) == s.charAt(i)) {
          len++;
          left--;
      }
      while (right < strLen && s.charAt(right) == s.charAt(i)) {
          len++;
          right++;
      }
      while (left >= 0 && right < strLen && s.charAt(right) == s.charAt(left)) {
          len = len + 2;
          left--;
          right++;
      }
      if (len > maxLen) {
          maxLen = len;
          maxStart = left;
      }
      len = 1;
  }
  return s.substring(maxStart + 1, maxStart + maxLen + 1);

}
// 动态规划
function longestPalindrome2(s) {
  if (s == null || s.length < 2) {
      return s;
  }
  let strLen = s.length;
  let maxStart = 0;  //最长回文串的起点
  let maxEnd = 0;    //最长回文串的终点
  let maxLen = 1;  //最长回文串的长度

  let dp = new Array(strLen)
  for (let i = 0; i < strLen; i++) dp[i] = new Array(strLen).fill(false)
  for (let r = 1; r < strLen; r++) {
      for (let l = 0; l < r; l++) {
          if (s.charAt(l) == s.charAt(r) && (r - l <= 2 || dp[l + 1][r - 1])) {
              dp[l][r] = true;
              if (r - l + 1 > maxLen) {
                  maxLen = r - l + 1;
                  maxStart = l;
                  maxEnd = r;

              }
          }

      }

  }
  return s.substring(maxStart, maxEnd + 1);

}

function longestPalindrome3(s) {
  let len = s.length;
  if (len < 2) {
      return s;
  }

  let maxLen = 1;
  let begin = 0;
  // dp[i][j] 表示 s[i..j] 是否是回文串
  let dp = new Array(len)
   // 初始化：所有长度为 1 的子串都是回文串
  for (let i = 0; i < len; i++) dp[i] = new Array(len).fill(true)
 

  let charArray = s.split("");
  // 递推开始
  // 先枚举子串长度
  for (let L = 2; L <= len; L++) {
      // 枚举左边界，左边界的上限设置可以宽松一些
      for (let i = 0; i < len; i++) {
          // 由 L 和 i 可以确定右边界，即 j - i + 1 = L 得
          let j = L + i - 1;
          // 如果右边界越界，就可以退出当前循环
          if (j >= len) {
              break;
          }

          if (charArray[i] != charArray[j]) {
              dp[i][j] = false;
          } else {
              if (j - i < 3) {
                  dp[i][j] = true;
              } else {
                  dp[i][j] = dp[i + 1][j - 1];
              }
          }

          // 只要 dp[i][L] == true 成立，就表示子串 s[i..L] 是回文，此时记录回文长度和起始位置
          if (dp[i][j] && j - i + 1 > maxLen) {
              maxLen = j - i + 1;
              begin = i;
          }
      }
  }
  return s.substring(begin, begin + maxLen);
}

let s = "bacaabad"
debugger
console.log(longestPalindrome2(s))