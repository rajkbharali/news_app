import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData} from './actions/getActions';

import { AppBar,Box,Toolbar,Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { Container} from '@mui/system';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function App() {
  const {all_data} = useSelector(state=>state.dataDetails)
  // console.log(all_data)

  const dispatch = useDispatch()
  
  const [showData, setShowData] = useState([])
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpanded1(false)
  };

  const handleSubChange = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
  };
  
  useEffect(() => {
    if(all_data.length===0) dispatch(getAllData())
  },[])
  
  
  useEffect(() => {
    if(all_data.length>0){
      const reducedData = all_data.reduce((acc,item) => {
        const row = acc.find(x => x.userId === item.userId)
        if(row){
          row.info.push({title:item.title,body:item.body})
        }else{
          const newObj = {
            userId : item.userId,
            info : [{
              title : item.title,
              body : item.body
            }]
          }
          acc.push(newObj)
        }
        return acc
      },[])
      console.log(reducedData)
      setShowData(reducedData)
  }},[all_data])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{height:"70px",background:"#7BE495"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <br/>
      {/* <div> */}
        <Container sx={{background:"#CFF4D2", paddingTop:"25px",borderRadius:"15px",paddingBottom:"25px"}}>
        {showData.length>0 && (
          showData.map(x=> (
              <Accordion key={x.userId} expanded={expanded === `panel${x.userId}`} onChange={handleChange(`panel${x.userId}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Category {x.userId}
                  </Typography>
                  {/* <Typography sx={{ color: 'text.secondary' }}>{x.userId}</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  <Container sx={{background:"#CFF4D2", paddingTop:"25px",borderRadius:"15px",paddingBottom:"25px"}}>
                  {x.info.map((x,index) => (
                    <Accordion key={index+1} expanded={expanded1 === `panel${index+1}`} onChange={handleSubChange(`panel${index+1}`)}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                          Subcategory {index+1}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{x.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {x.body}
                        </Typography>
                        <br/>
                        <Button 
                          style={{textDecoration:"none"}} 
                          variant='contained' 
                          color="secondary" 
                          size='small'
                          onClick={() => setExpanded1(false)}
                        >
                          read later...
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  </Container>
                </AccordionDetails>
              </Accordion>
            ))
            )}
            </Container>
      {/* </div> */}
    </Box>
  );
}
