import React from "react";

export default function Main()
{
    const changeMode = (e) =>
    {
        let [PBTN, WBTN] = [document.querySelector("#PreviewBtn"), document.querySelector("#WriteBtn")]
        if(e.target === PBTN)
        {
            PBTN.className = "active"
            WBTN.className = ""
        }
        else
        {
            PBTN.className = ""
            WBTN.className = "active"
        }
        document.querySelector("#PreviewMode").style.display = PBTN.className === "active" ? "initial" : "none"
        document.querySelector("#WriteMode").style.display = WBTN.className === "active" ? "initial" : "none"
    }
    const changeText = (s1,s2,r) =>
    {
        let selection = window.getSelection();
        let [SP, EP] = [selection.getRangeAt(0).startOffset, selection.getRangeAt(0).endOffset]
        let text = selection.focusNode.data
        if(!text)
        {
            selection.focusNode.textContent = s1+s2
        }
        else if(!selection.toString())
        {
            selection.focusNode.data = text.slice(0, SP)+s1+s2+text.slice(EP);
        }
        else
        {
            let stext = text.substring(SP,EP);
            text = r ? s1 : text.slice(0, SP)+s1+stext+s2+text.slice(EP)
            selection.focusNode.data = text;
            return 1;
        }
    }

    return(
        <main>
                <button className="active" id="WriteBtn" onClick={changeMode}>Write</button>
                <button id="PreviewBtn" onClick={changeMode}>Preview</button>
                <div id="PreviewMode">
                    <div id="Preview">

                    </div>
                </div>
                <div id="WriteMode">
                    <div id="textStyling">
                        <div id="text">
                            <button title="Heading" id="Heading" onClick={() =>changeText("# ","",false)}><i className="fa-solid fa-heading"></i></button>
                            <div id="HeadingExtent"><button onClick={() =>changeText("# ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-1"></i></button><button onClick={() =>changeText("## ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-2"></i></button><button onClick={() =>changeText("### ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-3"></i></button><button onClick={() =>changeText("#### ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-4"></i></button><button onClick={() =>changeText("##### ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-5"></i></button><button onClick={() =>changeText("###### ","",false)}><i className="fa-solid fa-heading"></i><i className="fa-solid fa-6"></i></button></div>
                            <button title="Horizontal line" id="HL" onClick={() =>changeText("---","",true)}><i className="fa-solid fa-ruler"></i></button>
                            <button title="Bold" id="Bold" onClick={() =>changeText("**","**",false)}><i className="fa-solid fa-bold"></i></button>
                            <button title="Cursive" id="Cursive" onClick={() =>changeText("*","*",false)}><i className="fa-solid fa-italic"></i></button>
                            <button title="Bold & Cursive" id="BaC" onClick={() =>changeText("***","***",false)}><i className="fa-solid fa-bold"></i><i className="fa-solid fa-italic"></i></button>
                            <button title="Strikethrough" id="Strike" onClick={() =>changeText("~~","~~",false)}><i className="fa-solid fa-strikethrough"></i></button>
                            <button title="Subscript" id="sub"onClick={() =>changeText("<sub>","</sub>",false)}><i className="fa-solid fa-subscript"></i></button>
                            <button title="Superscript" id="Super" onClick={() =>changeText("<sup>","</sup>",false)}><i className="fa-solid fa-superscript"></i></button>
                        </div>
                        <div id="advance">
                            <button title="Link" id="Link" onClick={() =>changeText("[","](Link)",false)}><i className="fa-solid fa-link"></i></button>
                            <button title="Image" id="Image" onClick={() =>changeText("![","](Link)",false)}><i className="fa-solid fa-image"></i></button>
                            <button title="Quote" id="Quote" onClick={() =>changeText("> ","",false)}><i className="fa-solid fa-quote-left"></i></button>
                            <button title="Code" id="Code" onClick={() =>changeText("`","`",false)}><i className="fa-solid fa-code"></i></button>
                        </div>
                        <div id="list">
                            <button title="Unordered list" id="UNL" onClick={() =>changeText("- ","",false)}><i className="fa-solid fa-list"></i></button>
                            <button title="Ordered list" id="OL" onClick={() =>changeText("1. ","",false)}><i className="fa-solid fa-list-ol"></i></button>
                            <button title="Checked" id="Check" onClick={() =>changeText("- [x] ","",false)}><i className="fa-solid fa-check"></i></button>
                            <button title="Unchecked" id="Check" onClick={() =>changeText("- [ ] ","",false)}><i className="fa-solid fa-x"></i></button>
                        </div>
                </div>
                <div contentEditable="false" spellCheck="false" id="Write" type="text" tabIndex="-1"></div>
            </div>
        </main>
    )
}