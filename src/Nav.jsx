import React from "react"

export default function Nav()
{
    localStorage.getItem("ID") ?? localStorage.setItem("ID",0);

    const downloadFunc = (Note) =>
    {
        let text = localStorage.getItem(Note);
        text = text.replaceAll("<br>","").replaceAll("</div>","\n").replaceAll("<div>","").replaceAll("<br>","").replaceAll("&nbsp;","  ").replaceAll("&gt;",">").replaceAll("&lt;","<")
        let blob = new Blob([text], {type: "text/markdown"})
        document.getElementById("downloadNote").href = URL.createObjectURL(blob);
        document.getElementById("downloadNote").download = `${Note}.md`
        document.getElementById("downloadNote").click()
    }

    const getNotes = () =>
    {
        const NotesName = []
        const NotesID = []
        let ni = 0;
        for(let i = 0; i < localStorage.getItem("ID"); i++)
        {
            while(!localStorage.getItem(`Note${ni}`))
            {
                ni++
            }
            NotesName.push(localStorage.getItem(`Note${ni}`).split("<div>")[1].split("<br>")[0].split("</div>")[0])
            NotesID.push(`Note${ni}`)
            ni++
        }
        return [NotesName,NotesID]
    }

    let Notes = React.useState(getNotes())

    const removeNote = (e) =>
    {
        if(!localStorage.getItem("RemovedNotesID"))
        {
            localStorage.setItem("RemovedNotesID", [e.currentTarget.parentNode.id]);
        }
        else
        {
            let getRemoved = [localStorage.getItem("RemovedNotesID")]
            getRemoved.push(e.currentTarget.parentNode.id)
            localStorage.setItem("RemovedNotesID", getRemoved);
        }
        localStorage.setItem("ID", (localStorage.getItem("ID")-1));
        localStorage.removeItem(e.currentTarget.parentNode.id)
        Notes[1](getNotes())
    }

    const createNote = () =>
    {
        if(localStorage.getItem("RemovedNotesID"))
        {
            let getRemoved = localStorage.getItem("RemovedNotesID").split(",")
            let Removed = getRemoved.shift()
            localStorage.setItem(Removed, `<div># ${Removed.replace("e","e ")}</div>`);
            localStorage.setItem("RemovedNotesID", getRemoved);
            localStorage.setItem("ID",(parseInt(localStorage.getItem("ID"))+1));
            Notes[1](getNotes())
        }
        else
        {
            localStorage.setItem("ID",(parseInt(localStorage.getItem("ID"))+1));
            localStorage.setItem(`Note${localStorage.getItem("ID")}`,`<div># Note ${localStorage.getItem("ID")}</div>`);
            Notes[1](getNotes())
        }
    }

    const RenderNotes = Notes[0][0].map((n,i)=>
    {
        return <div className="noteButton" id={Notes[0][1][i]} key={`Note${i+1}`}>{n}<button onClick={removeNote}><i className="fa-solid fa-trash"></i></button><button className="download" onClick={() =>downloadFunc(Notes[0][1][i])}><i className="fa-solid fa-download"></i></button></div>
    })

    return(
        <nav>
            <a id="downloadNote"></a>
            <h1>MD Notes<button onClick={createNote}><i className="fa-solid fa-plus" /></button></h1>
            {RenderNotes}
        </nav>   
    )
}