// Проверка на десктоп сафари

let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let isDesktopSafari = isSafari && !navigator.userAgent.match(/Mobile/);
