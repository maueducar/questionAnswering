import React, { useEffect, useState } from 'react';



const ComboModels = () => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState(null);
    const [items,setItems] = useState([]);
       
    useEffect(() => {
        setIsLoaded(true);
        setError(false);
        const aux = [
            {
                "Description": "fine-tuned on SQuAD-es-v2.0 and distilled version of BETO for Q&A.",
                "Id": 1,
                "Model": "mrm8488/distill-bert-base-spanish-wwm-cased-finetuned-spa-squad2-es"
            }
        ];            
        setItems(aux);

        fetch("/api/v1.0/models/")
        .then(res => res.json())
        .then(
          (result) => {
            //   debugger;
              setIsLoaded(true);
              setError(null);
              setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // debugger;
            setIsLoaded(false);
            setError(false);
            /*const aux = [
                {
                    "Description": "fine-tuned on SQuAD-es-v2.0 and distilled version of BETO for Q&A.",
                    "Id": 1,
                    "Model": "mrm8488/distill-bert-base-spanish-wwm-cased-finetuned-spa-squad2-es"
                }
            ]; */           
            setItems([]);
          }
        )
      }, []);

  return <>
   {error && <div>Error: {error.message}</div>}
   {!isLoaded && <div>Is Loading...</div>}
    <select class="model" name="select" id="selectModel">
    {items.map(item => (
        <option value={item.Model}>{item.Description}</option>              
    ))}
    </select>
</>;

};



export default ComboModels;