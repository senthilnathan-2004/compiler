const htmlEditorDiv = document.getElementById('html-editor');
const cssEditorDiv = document.getElementById('css-editor');
const jsEditorDiv = document.getElementById('js-editor');
const outputFrame = document.getElementById('output');
const htmlEditorSection = document.getElementById('html-editor-section');
const cssEditorSection = document.getElementById('css-editor-section');
const jsEditorSection = document.getElementById('js-editor-section');
const codeNavigationButtons = document.querySelectorAll('.code-navigation button');

let htmlEditor, cssEditor, jsEditor;

function initializeCodeMirror() {
    htmlEditor = CodeMirror(htmlEditorDiv, {
        mode: 'htmlmixed',
        theme: 'monokai', // Using a consistent dark theme
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentWithTabs: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
    });

    cssEditor = CodeMirror(cssEditorDiv, {
        mode: 'css',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentWithTabs: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
    });

    jsEditor = CodeMirror(jsEditorDiv, {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentWithTabs: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
    });

    loadCode(); // Load saved code after initializing CodeMirror
    showEditor('html'); // Show HTML editor by default on load
}

function runCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = "<style>" + cssEditor.getValue() + "</style>";
    const jsCode = "<script>" + jsEditor.getValue() + "<\/script>";
    outputFrame.srcdoc = htmlCode + cssCode + jsCode;
}

function showEditor(editorType) {
    // Deactivate all editor sections and navigation buttons
    htmlEditorSection.classList.remove('active');
    cssEditorSection.classList.remove('active');
    jsEditorSection.classList.remove('active');
    codeNavigationButtons.forEach(button => button.classList.remove('active'));

    // Activate the selected editor section and navigation button
    switch (editorType) {
        case 'html':
            htmlEditorSection.classList.add('active');
            codeNavigationButtons[0].classList.add('active');
            break;
        case 'css':
            cssEditorSection.classList.add('active');
            codeNavigationButtons[1].classList.add('active');
            break;
        case 'js':
            jsEditorSection.classList.add('active');
            codeNavigationButtons[2].classList.add('active');
            break;
    }
}

function saveCode() {
    localStorage.setItem('htmlCode', htmlEditor.getValue());
    localStorage.setItem('cssCode', cssEditor.getValue());
    localStorage.setItem('jsCode', jsEditor.getValue());
    alert('Code saved to local storage!');
}

function loadCode() {
    const savedHtml = localStorage.getItem('htmlCode') || '';
    const savedCss = localStorage.getItem('cssCode') || '';
    const savedJs = localStorage.getItem('jsCode') || '';

    if (htmlEditor) htmlEditor.setValue(savedHtml);
    if (cssEditor) cssEditor.setValue(savedCss);
    if (jsEditor) jsEditor.setValue(savedJs);
    runCode(); // Run the loaded code
}

function clearCode() {
    if (htmlEditor) htmlEditor.setValue('');
    if (cssEditor) cssEditor.setValue('');
    if (jsEditor) jsEditor.setValue('');
    runCode();
}

// Initialize CodeMirror after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCodeMirror();
});