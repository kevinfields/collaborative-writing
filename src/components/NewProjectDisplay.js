import { Card, CardHeader, MenuItem, Select, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react'

const NewProjectDisplay = (props) => {


  const [details, setDetails] = useState({
    order: [],
    bass: '',
    drums: '',
    guitar: '',
    keyboards: '',
    vocals: '',
  })
  //take in all available data as props, select from it here, return selected values with single 
  //functional prop


  return (
    <Card>
      <CardHeader title={'Create a New Project'} />
      <div
      >
        <TextField
          type='select'
          value={details.bass}
          onChange={(e) => setDetails({...details, bass: e.target.value})}
        >
          {props.bassMembers.map(member => (
            <MenuItem value={member} />
          ))}
        </TextField>
        <Select
          value={details.drums}
          onChange={(e) => setDetails({...details, drums: e.target.value})}
        >
          {props.drumsMembers.map(member => (
            <MenuItem value={member} />
          ))}
        </Select>
        <Select
          value={details.guitar}
          onChange={(e) => setDetails({...details, guitar: e.target.value})}
        >
          {props.guitarMembers.map(member => (
            <MenuItem value={member} />
          ))}
        </Select>
        <Select
          value={details.keyboards}
          onChange={(e) => setDetails({...details, keyboards: e.target.value})}
        >
          {props.keyboardsMembers.map(member => (
            <MenuItem value={member} />
          ))}
        </Select>
        <Select
          value={details.vocals}
          onChange={(e) => setDetails({...details, vocals: e.target.value})}
        >
          {props.vocalsMembers.map(member => (
            <MenuItem value={member} />
          ))}
        </Select>
      </div>
    </Card>
  )
}

export default NewProjectDisplay