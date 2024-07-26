import React, { useState } from "react";

const SegmentPopup = React.forwardRef((props, ref) => {
  const [schemas, setSchemas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [segmentName, setSegmentName] = useState("");
  const webhookUrl =
    "https://webhook.site/dde5812c-d543-4163-976c-df6266237766";

  const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddSchema = () => {
    const selectedValue = document.getElementById("schema-dropdown").value;
    if (selectedValue && !selectedOptions.includes(selectedValue)) {
      setSchemas([...schemas, selectedValue]);
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
  };

  const handleSchemaChange = (index, event) => {
    const newSchemas = [...schemas];
    newSchemas[index] = event.target.value;
    setSchemas(newSchemas);

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleRemoveSchema = (index) => {
    const newSchemas = schemas.filter((_, i) => i !== index);
    const newSelectedOptions = selectedOptions.filter((_, i) => i !== index);
    setSchemas(newSchemas);
    setSelectedOptions(newSelectedOptions);
  };

  const getAvailableOptions = (selected) => {
    return options.filter((option) => !selected.includes(option.value));
  };

  const handleSaveSegment = async () => {
    const schemaData = schemas.map((schema) => {
      const option = options.find((option) => option.value === schema);
      return { [schema]: option.label };
    });

    const data = {
      segment_name: segmentName,
      schema: schemaData,
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setSegmentName("");
      setSchemas([]);
      setSelectedOptions([]);
      alert("Data Added");
      ref.current.close();
    } catch (error) {
      ref.current.close();
    }
  };

  const handleClose = () => {
    ref.current.close();
  };

  return (
    <dialog ref={ref} className="dialog-container">
      <h1 onClick={handleClose} className="saving"><span className="span-arrow">{'<'}</span>Saving Segment</h1>
      <div className="dialog-section">
        <p className="title">Enter the Name of the Segment</p>
        <input
          className="sec-input"
          placeholder="Name of the segment"
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <p className="para">
          To save your segment, you need to add your schemas to build the query
        </p>
        <div className="blue-box">
          {schemas.map((schema, index) => (
            <div key={index} className="schema-item">
              <select
                value={schema}
                onChange={(e) => handleSchemaChange(index, e)}
                className="sec-input"
              >
                {getAvailableOptions(selectedOptions).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                <option key={schema} value={schema}>
                  {options.find((option) => option.value === schema).label}
                </option>
              </select>
              <span
                className="remove-icon"
                onClick={() => handleRemoveSchema(index)}
              >
                -
              </span>
            </div>
          ))}
        </div>
        <select id="schema-dropdown" className="sec-input">
          {getAvailableOptions(selectedOptions).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <a href="#!" onClick={handleAddSchema} className="add-schema">
          +Add new schema
        </a>
      </div>
      <div className="footer">
        <button
          className="save-button"
          type="button"
          onClick={handleSaveSegment}
        >
          Save the segment
        </button>
        <button className="cancel-button" type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </dialog>
  );
});

export default SegmentPopup;
