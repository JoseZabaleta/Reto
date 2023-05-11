const btnEncrypt = document.getElementById("btnEncrypt");
btnEncrypt.addEventListener("click", encrypt);
const btnDecrypt = document.getElementById("btnDecrypt");
btnDecrypt.addEventListener("click", decrypt);
const btnCopy = document.getElementById("btnCopy");
btnCopy.addEventListener("click", copyToClipboard);


function encrypt() {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "" ){
        Swal.fire({
            icon: "error",
            title: "Necesita escribir un texto para encriptarlo",
            position: "center",
            showConfirmButton: true
        })
    } else if (validate(inputText)) {
        printOutputText(encryptText(inputText));
    } else {
        Swal.fire({
            icon: "error",
            title: "El texto no puede incluir mayusculas, caracteres especiales ni números",
            position: "center",
            showConfirmButton: true
        })
    }

}

function validate(text) {
    const pattern = new RegExp(/^[a-záéíóúñü\s]+$/i);
    return pattern.test(text);
}



function decrypt() {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Ingrese el texto a desencriptar",
            position: "center",
            showConfirmButton: true
        })
    } else if (validate(inputText)) {
        printOutputText(decryptText(inputText));
    } else {
        Swal.fire({
            icon: "error",
            title: "El texto no puede incluir mayusculas, caracteres especiales ni números",
            position: "center",
            showConfirmButton: true
        })
    }


}

const encryptText = (text) => {
    return text.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

const decryptText = (encryptedText) => {
    return encryptedText.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

function printOutputText(text) {
    const outputText = document.getElementById("outputText");
    if (getComputedStyle(outputText).getPropertyValue("display") === "none") {
        outputText.style.display = "block";
        btnCopy.style.display = "inline";
        const asideElements = document.getElementsByClassName("changeVisibility");
        for (const element of asideElements) {
            element.style.display = "none";
        }
    }
    outputText.value = text;

}



function copyToClipboard() {
    const outputTextarea = document.getElementById("outputText");
    const outputText = outputTextarea.value;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            Swal.fire({
                toast: true,
                icon: "success",
                title: "Copiado",
                
              
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        });
    outputTextarea.value = "";
    document.getElementById("inputText").value = "";
    outputTextarea.style.display = "none";
    btnCopy.style.display = "none";
    const asideElements = document.getElementsByClassName("changeVisibility");
    for (const element of asideElements) {
        element.style.display = "";
    }
}