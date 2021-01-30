import React, { useState } from 'react';

const BoothGroupConfig = () => {
  const exampleBoothGroups = [
    {
      groupId: 'G01',
      groupName: 'Medicine',
      groupDescription: 'Medicine Description',
    },
    {
      groupId: 'G02',
      groupName: 'Engineering',
      groupDescription: 'Engineering Description',
    },
    {
      groupId: 'G03',
      groupName: 'Science',
      groupDescription: 'Science Description',
    },
  ];

  const [boothGroups, setBoothGroups] = useState(exampleBoothGroups);

  function deleteBoothGroup(groupId) {
    console.log(`Deleting group ${groupId}`);
    for (let i = 0; i < boothGroups.length; i++) {
      const boothGroup = boothGroups[i];
      if (boothGroup.groupId === groupId) {
        boothGroups.splice(i, 1);
        break;
      }
    }
    setBoothGroups([...boothGroups]);
  }
  function updateBoothGroup(boothGroup) {
    console.log('Updating group', boothGroup.groupId);
    for (let i = 0; i < boothGroups.length; i++) {
      if (boothGroups[i].groupId === boothGroup.groupId) {
        boothGroups[i] = boothGroup;
        break;
      }
    }
    setBoothGroups([...boothGroups]);
  }

  const boothGroupNewBlank = {
    groupId: '',
    groupName: '',
    groupDescription: '',
  };
  const [boothGroupNew, setBoothGroupNew] = useState(boothGroupNewBlank);

  function handleChangeNewGroupInput(event) {
    console.log(event.target.name, ':', event.target.value);
    setBoothGroupNew({
      ...boothGroupNew,
      [event.target.name]: event.target.value,
    });
  }

  function addBoothGroup(event) {
    event.preventDefault();
    let isBoothGroupNewIdValid = true;
    for (let i = 0; i < boothGroups.length; i++) {
      const boothGroup = boothGroups[i];
      if (boothGroup.groupId === boothGroupNew.groupId) {
        isBoothGroupNewIdValid = false;
        break;
      }
    }
    if (isBoothGroupNewIdValid) {
      setBoothGroups([...boothGroups, boothGroupNew]);
      setBoothGroupNew(boothGroupNewBlank);
      alert('Adding new group successfully');
    } else {
      alert('Please use another id. This id has already been used.');
    }
  }

  return (
    <>
      <h1>Booth Groups</h1>
      <ul>
        {boothGroups.map(boothGroup => (
          <BoothGroup
            key={boothGroup.groupId}
            boothGroup={boothGroup}
            onDelete={deleteBoothGroup}
            onUpdate={updateBoothGroup}
          />
        ))}
      </ul>
      <form onSubmit={addBoothGroup}>
        <h2>Add new booth group</h2>
        <label htmlFor="newGroupId">GroupID: </label>
        <input
          type="text"
          id="newGroupId"
          name="groupId"
          value={boothGroupNew.groupId}
          onChange={handleChangeNewGroupInput}
          required
        />
        <label htmlFor="newGroupName">GroupName: </label>
        <input
          type="text"
          id="newGroupName"
          name="groupName"
          value={boothGroupNew.groupName}
          onChange={handleChangeNewGroupInput}
          required
        />
        <br />
        <label htmlFor="inputGroupDescription">Description: </label>
        <textarea
          id="inputGroupDescription"
          name="groupDescription"
          value={boothGroupNew.groupDescription}
          onChange={handleChangeNewGroupInput}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

const BoothGroup = props => {
  const { boothGroup, onDelete, onUpdate } = props;
  const { groupId, groupName, groupDescription } = boothGroup;

  const [isShowEditForm, setIsShowEditForm] = useState(false);
  function toggleEditForm() {
    setIsShowEditForm(!isShowEditForm);
  }
  function editBoothGroup(boothGroupEditted) {
    onUpdate(boothGroupEditted);
    toggleEditForm();
  }
  function deleteBoothGroup() {
    onDelete(groupId);
  }

  return (
    <li key={groupId}>
      <div>
        <h4>{groupName}</h4>
        <p>
          ID: {groupId}
          <br />
          Description: {groupDescription}
        </p>
        {isShowEditForm ? (
          <EditBoothGroupForm
            boothGroup={boothGroup}
            onSubmit={editBoothGroup}
          />
        ) : null}
        <button onClick={toggleEditForm}>
          {!isShowEditForm ? 'Edit' : 'Cancel'}
        </button>
        <button name={groupId} onClick={deleteBoothGroup}>
          Delete
        </button>
      </div>
    </li>
  );
};

const EditBoothGroupForm = props => {
  const { boothGroup, onSubmit } = props;
  const { groupId } = boothGroup;
  const [boothGroupEditted, setBoothGroupEditted] = useState(boothGroup);
  function handleChangeEditGroupInput(event) {
    setBoothGroupEditted({
      ...boothGroupEditted,
      [event.target.name]: event.target.value,
    });
  }
  function editBoothGroup(event) {
    event.preventDefault();
    onSubmit(boothGroupEditted);
  }
  return (
    <form onSubmit={editBoothGroup}>
      <label>ID: </label>
      <input
        type="text"
        id="inputGroupId"
        name="groupId"
        value={boothGroupEditted.groupId}
        disabled
      />
      <br />
      <label htmlFor={`groupName_${groupId}`}>Name: </label>
      <input
        type="text"
        id={`groupName_${groupId}`}
        name="groupName"
        value={boothGroupEditted.groupName}
        onChange={handleChangeEditGroupInput}
        required
      />
      <br />
      <label htmlFor={`groupDescription_${groupId}`}>Description: </label>
      <textarea
        id={`groupDescription_${groupId}`}
        name="groupDescription"
        value={boothGroupEditted.groupDescription}
        onChange={handleChangeEditGroupInput}
      />
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default BoothGroupConfig;
