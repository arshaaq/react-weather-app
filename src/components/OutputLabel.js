const OutputLabel = ({name, text}) =>{

    return(
    <>
    
        <p className = {name} id={name}>{text}</p>
    </> 
    );
        
    

}

export default OutputLabel;