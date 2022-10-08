import React from "react";
import ReactDOM from "react-dom/client"
import Nav from "./Nav.jsx"
import Main from "./Main.jsx"
import "./index.css"

const App = () =>
{
    let [content, setContent] = React.useState("")

    const matchesSingle = {"- [ ]":"<input type='checkbox' disabled>","- [x]":"<input type='checkbox' disabled checked>","![":"<img alt='","[":"<a>","](":"' src='",")":"' />","###### ":"<h6>","##### ":"<h5>","#### ":"<h4>","### ":"<h3>","## ":"<h2>","# ":"<h1>","&nbsp;&nbsp;&nbsp; - ":"<ul><ul><ul><li>","&nbsp; - ":"<ul><ul><li>","---":"<hr/>","- ":"<ul><li>","&lt;sup&gt;":"<sup>","&lt;/sup&gt;":"</sup>","&lt;sub&gt;":"<sub>","&lt;/sub&gt;":"</sub>","&gt;":"<blockquote>","1. ":"<ol><li>"}
    const matchesMulti = {"`":"code","~~":"s","**":"b","*":"i"}

    window.addEventListener("click",(e)=>
    {
        if(e.target.className === "noteButton")
        {
            let formatedText = localStorage.getItem(e.target.id)
            document.querySelectorAll(".noteButton").forEach(i=>
            {
                i.className = "noteButton";
            })
            const Write = document.getElementById("Write");
            e.target.className = "noteButton active";
            Write.innerHTML = localStorage.getItem(e.target.id);
            Write.contentEditable = "true";
            Write.addEventListener("focusout", ()=>
            {
                localStorage.setItem(document.querySelector(".active").id, Write.innerHTML)
            })
            formatedText = localStorage.getItem(e.target.id)
            for(let x in matchesSingle)
            {
                while(formatedText.indexOf(x) !== -1)
                {
                    if(x === "![")
                    {
                        let leftText = formatedText.substring(0,formatedText.indexOf(x))
                        let rightText = formatedText.substring(formatedText.indexOf(x))
                        formatedText = leftText+rightText.replace("![",matchesSingle["!["]).replace("](", matchesSingle["]("]).replace(")", matchesSingle[")"])
                    }
                    else if(x === "[")
                    {
                        let leftText = formatedText.substring(0,formatedText.indexOf(x))
                        let rightText = formatedText.substring(formatedText.indexOf(x))
                        rightText = rightText.replace("[",matchesSingle["["]).replace("](","</a>")
                        let EP = rightText.indexOf(")");
                        let SP = rightText.indexOf("</a>")+4
                        let Link = rightText.substring(EP,SP)
                        rightText = rightText.replace("<a>",`<a href='${Link}'>`).replace(`${Link})`,"")
                        formatedText = leftText + rightText
                    }
                    else
                    {
                        formatedText=formatedText.replace(x, matchesSingle[x])
                    }
                }
            }
            for(let x in matchesMulti)
            {
                let mi = 1;
                while(formatedText.indexOf(x) !== -1)
                {
                    let paste = mi&1 ?  `<${matchesMulti[x]}>` : `</${matchesMulti[x]}>`
                    formatedText=formatedText.replace(x, paste)
                    mi++
                }
                mi = 1
            }
            setContent(formatedText)
        }
    })

    window.addEventListener("focusout",()=>
    {
        if(document.querySelector(".noteButton.active"))
        {
            let formatedText = localStorage.getItem(document.querySelector("div.active").id)
            for(let x in matchesSingle)
            {
                while(formatedText.indexOf(x) !== -1)
                {
                    if(x === "![")
                    {
                        let leftText = formatedText.substring(0,formatedText.indexOf(x))
                        let rightText = formatedText.substring(formatedText.indexOf(x))
                        formatedText = leftText+rightText.replace("![",matchesSingle["!["]).replace("](", matchesSingle["]("]).replace(")", matchesSingle[")"])
                    }
                    else if(x === "[")
                    {
                        let leftText = formatedText.substring(0,formatedText.indexOf(x))
                        let rightText = formatedText.substring(formatedText.indexOf(x))
                        rightText = rightText.replace("[",matchesSingle["["]).replace("](","</a>")
                        let EP = rightText.indexOf(")");
                        let SP = rightText.indexOf("</a>")+4
                        let Link = rightText.substring(EP,SP)
                        rightText = rightText.replace("<a>",`<a href='${Link}'>`).replace(`${Link})`,"")
                        formatedText = leftText + rightText
                    }
                    else
                    {
                        formatedText=formatedText.replace(x, matchesSingle[x])
                    }
                }
            }
            for(let x in matchesMulti)
            {
                let mi = 1;
                while(formatedText.indexOf(x) !== -1)
                {
                    let paste = mi&1 ?  `<${matchesMulti[x]}>` : `</${matchesMulti[x]}>`
                    formatedText=formatedText.replace(x, paste)
                    mi++
                }
                mi = 1
            }
            setContent(formatedText)
    }
    })

    React.useEffect(()=>
    {
        document.querySelector("#Preview").innerHTML = content
    }, [content])

    //Slider logic code
    window.addEventListener("pointerdown",(e)=>
    {
        if(e.target.id === "slider")
        {
            window.addEventListener("pointermove", function getX(e)
            {
                let x = e.clientX
                document.querySelector("nav").style.width = (x - 11 + "px");
                document.querySelector("main").style.width = ((document.body.offsetWidth-x) - 1 + "px")
                if((x) <= 186)
                {
                    window.removeEventListener("pointermove", getX);
                    document.querySelector("nav").style.width = (186-6 + "px");
                    document.querySelector("main").style.width = ((document.body.offsetWidth-186-6) + "px");
                }
                else if((document.body.offsetWidth - x) <=362)
                {
                    window.removeEventListener("pointermove", getX);
                    document.querySelector("main").style.width = (367-6 + "px");
                    document.querySelector("nav").style.width = ((document.body.offsetWidth-367-6) + "px");
                }
                window.addEventListener("pointerup",()=> window.removeEventListener("pointermove", getX))
                window.addEventListener("resize",()=>
                {
                    document.querySelector("nav").style.width = (x - 11 + "px");
                    document.querySelector("main").style.width = ((document.body.offsetWidth-x) - 1 + "px")
                })
            })
        }
    })

    return(
        <>
        <Nav />
        <div id="slider"></div>
        <Main />
        </>
    )
}
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);