import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
 const [loading,setLoading]=useState(false);
    const [value,setValue]=useState('');
    const [output,setOutput]=useState([]);
    const [result,setResult]=useState([]);
    useEffect(()=>{
        console.log("mount");
            fetch('https://pharmacy-6bcb1.firebaseio.com/record.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                 setOutput(Object.values(data));
                setResult(Object.values(data));
                 //console.log(output);
            })
    },[])

// useEffect(()=>{
//     result=output;
// },[])
    useEffect(()=>{
        if(value.length>0){
          setLoading(true);
       
          setLoading(false);
             setResult([]);
             let searchQuery=value.toLowerCase();
             for(const key of output){
                 let med=key.name.toLowerCase();
                 if(med.slice(0,searchQuery.length).indexOf(searchQuery) !== -1){
                     setResult(prevResult=>{
                         return [...prevResult,key]
                     })
                 }
             
             
         }
        }else{
         setResult(output.slice(0,100));
        }}
    ,[value])

     result.sort((a, b)=>{
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
     })
     

    return (
        
            <div className="container">
           <center> <h3><b><p className="text-success"></p></b></h3></center>
           <br></br><br></br>
           <div className="container-sm sticky-top">
          <center><input type="text" className="form-control" placeholder="Search Medicine here"
            onChange={(event)=> setValue(event.target.value)}
            value={value}
            /></center>  </div>
            <div className="SearchBack">
                <div className="SearchEntry">
                <table className="table table-striped mb-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Box</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  {result?.map((salad,index) => (
                        <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{salad.name}</td>
      <td>{salad.box}</td>
      <td>{salad.price}</td>
    </tr>        
  ))}
  </tbody>
</table>
                    
                </div>
            </div>
            <footer class="container fixed-bottom bg-white">
    <p class="float-end"><a href="#">Back to top</a></p>
    <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
            </div> 
            
        
    )
}
