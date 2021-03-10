import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../adminStore';

export default function BoothGroupConfig(props) {
  const adminStore = useAdminStore();
  const yearId = props.yearId;
  const [boothGroups, setBoothGroups] = useState(props.boothGroups);

  useEffect(() => {
    adminStore.getBoothGroups(yearId).then(boothGroups => {
      setBoothGroups(boothGroups);
    });
  }, [adminStore.boothGroupsStore])

  function deleteBoothGroup(groupId) {
    console.log(`Deleting group ${groupId}`);
    adminStore
      .boothGroup(yearId)
      .remove(groupId)
      .then(() => {
        console.log(`Deleted group ${groupId} successfully.`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function updateBoothGroup(boothGroup) {
    console.log(`Updating group ${boothGroup.groupId}`);
    adminStore
      .boothGroup(yearId)
      .update(boothGroup)
      .then(() => {
        console.log(`Updated group ${boothGroup.groupId} successfully.`);
      })
      .catch(err => {
        console.error(err);
      });
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
      console.log(`Adding group ${boothGroupNew.groupId}`);
      adminStore
        .boothGroup(yearId)
        .add(boothGroupNew)
        .then(() => {
          setBoothGroupNew(boothGroupNewBlank);
          alert('Added new group successfully');
        })
        .catch(err => {
          console.error(err);
        });
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
    if (
      window.confirm(
        `Are you sure to delete ${groupName} booth group (${groupId})?`
      )
    ) {
      onDelete(groupId);
    }
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
