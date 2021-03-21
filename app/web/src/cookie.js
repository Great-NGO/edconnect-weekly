export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

// export function createCookie(name, value, exdays) {
//     if (exdays) {
//         var date = new Date();
//         date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
//         var expires = "; expires=" + date.toGMTString();
//     }
//     else expires = "";
//     document.cookie = name + "=" + value + expires + "; path=/";
// }

// const cookie = () => {
//     const createCookie = (name, value, exdays) =>{
// 		if (exdays) {
// 			var date = new Date();
// 			date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
// 			var expires = "; expires=" + date.toGMTString();
// 		}
// 		else expires = "";
// 		document.cookie = name + "=" + value + expires + "; path=/";
// 	}

// 	const getCookie = (name) =>{
// 		var nameEQ = name + "=";
// 		var ca = document.cookie.split(';');
// 		for (var i = 0; i < ca.length; i++) {
// 			var c = ca[i];
// 			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
// 			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
// 		}
// 		return null;
// 	}
// }

// export default cookie;