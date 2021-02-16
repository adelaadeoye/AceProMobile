import React, { useState } from 'react';
import { View } from 'react-native';
import AddEvent from './AddEvent';

export default function EventDesc({ event: { title, event_type, start_date, end_date,
  invitees, location, modules, repeat } }) {
  console.log('repeat', repeat);
  const [addedMods, setAddedMods] = useState({
    mods: modules,
    togglState: [],
  });

  const evTopVals = { title, location, eventType: event_type, invitees }

  const evMidVals = {
    start: start_date,
    end: end_date,
  }

  const handleTogglDrop = (modTitle) => {
    const { togglState } = addedMods;
    console.log('tog', togglState);
    if (!togglState.includes(modTitle)) {
      return setAddedMods({
        ...addedMods,
        togglState: [modTitle, ...togglState]
      })
    }
    setAddedMods({
      ...addedMods,
      togglState: togglState.filter(e => e !== modTitle)
    })
  }

  const handleCollpAll = () => setAddedMods({
    ...addedMods,
    togglState: []
  })


  return <AddEvent repeat={repeat}
    form={evTopVals}
    time={evMidVals}
    startDate={''}
    setStartDate={() => { }}
    startTime={''}
    setStartTime={() => { }}
    endDate={''}
    setEndDate={() => { }}
    endTime={''}
    setEndTime={() => { }}
    validate={() => { }}
    err={{}}
    setErr={() => { }}
    setAddedMods={() => { }}
    addedMods={addedMods}
    handleTogglDrop={handleTogglDrop}
    handleCollpAll={handleCollpAll}
    handleRemoveMod={() => { }}
    handleSetRepeat={() => { }}
    handleShowAddMod={() => { }}
    handleShowRepeat={() => { }}
    eventDesc />
}