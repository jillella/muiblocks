## SOP: Manage Saved Configurations and Save Changes in the Analytics Page

### Objective

This SOP explains how to work with saved configurations on the analytics page, including selecting an existing configuration, saving a new configuration, and saving changes to an existing configuration. It also outlines the expected UI behavior so a team member can validate the workflow correctly.

### Key Steps

 

**1. Confirm the correct page and understand the configuration area** 


- Open the **analytics page** and verify you are working in the correct configuration section.
- Confirm that the page supports configuration-related actions such as **Save Changes** and **View Saved Configurations**.
- Understand that this workflow is tied to the existing page layout, not a separate page.

 

**2. Verify the default state of saved configurations** 

- Check whether **View Saved Configurations** is disabled by default.
- Confirm that no saved configuration is selected on first load unless the system preselects one.
- Validate that the UI reflects the current state of the configuration list correctly.

 

**3. Select or preselect a configuration** 


- Choose a configuration from the available list when the page loads.
- If the system supports preselection, ensure the intended configuration is already selected.
- Confirm that the selected configuration becomes available for further actions such as saving or editing.

 

**4. Save a configuration using the name field** 

- Enter the configuration name in the provided input field.
- Click **Save** to store the configuration.
- Verify that the configuration is saved successfully and appears in the saved configurations list.

 

**5. Open the saved configurations dropdown** 


- After saving, locate the **three-dot menu** or saved configuration control.
- Click it to enable or open the dropdown list of saved configurations.
- Confirm the saved configuration is visible in the list and can be selected.

 

**6. Validate the saved configuration list endpoint** 

- Check that the endpoint used to populate the saved configuration list is returning the expected configuration names.
- Confirm the list is populated with the correct saved items.
- Ensure the selected configuration is reflected properly in the UI.

 

**7. Preserve the existing UI behavior while changing state** 

- Keep the current UI structure intact.
- Update only the state logic needed for configuration selection and saved configuration behavior.
- Ensure the UI responds correctly when the selected configuration changes.

 

**8. Allow only selected values in the response** 

- Ensure the system accepts only the selected configuration values.
- Do not allow unselected or invalid values to be returned in the response.
- Confirm the selection state is the source of truth for the configuration data.

 

**9. Handle first-time save behavior for production-based configuration** 

- On the first page load, select the production-based configuration if required.
- Save the production configuration using the same configuration name if that is the intended default behavior.
- Confirm the existing configuration is established after the initial save.

 

**10. Save changes to an existing configuration** 

- Modify the existing configuration values as needed.
- Use **Save Changes** to update the current configuration without creating a new one.
- Verify that the updated configuration replaces the previous version.

 

**11. Save a renamed configuration as a new config** 

- If the configuration name is changed, treat it as a new configuration.
- Use the save action to create a new copy rather than overwriting the original.
- Confirm the new configuration is saved separately from the original.

 

**12. Work through the implementation branch and compare changes** 

- Use the appropriate development branch for the latest changes.
- Review the branch before making updates.
- Compare feature and development branches when validating the implementation.

 

**13. Identify the correct branch and feature source** 

- Confirm the feature branch and the origin branch being used.
- Verify the branch source before applying or reviewing changes.
- Use the correct branch pairing when comparing updates.

 

**14. Confirm the save app/config naming conventions** 

- Verify the configuration name and configuration type fields.
- Ensure the naming convention matches the expected analytics page format.
- Confirm the saved configuration list uses the correct names and types.

### Cautionary Notes

- Do not allow the **Save Changes** action to behave like **Save As New** unless the configuration name is changed.
- Make sure only selected configuration values are returned; avoid sending unselected or default placeholder values.
- Confirm the saved configuration dropdown is enabled only when a valid saved configuration exists.
- Be careful not to overwrite an existing configuration when the intent is to create a new one.
- Validate branch selection before implementing or reviewing code changes to avoid working in the wrong source.

### Tips for Efficiency

- Use the existing UI and update only the state logic where possible.
- Preselect the correct configuration on first load to reduce manual steps.
- Keep configuration names consistent to make saved items easier to find.
- Test the save flow in this order: select config → edit values → save changes → verify list update.
- When debugging, compare the feature branch against the development/origin branch to isolate differences quickly.
