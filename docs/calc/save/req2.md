NotesConfiguration Save Flow

- Save configuration disabled by default
- Save config enabled when user inputs new name
- Save triggers API call on button click
- Dropdown lists saved configurations from API
- Selecting config pre-populates values from API response

APIs and Integration

- Three APIs involved: list names, load config, save config
- API responses include only selected config values
- Save API payload includes config name and type
- Dev branch latest merges pending, review and merge in progress

UI Behavior and Logic

- Initial load shows production config, not editable
- Save as new config appears if config name modified
- Save changes button appears if editing existing config
- Existing UI to be maintained with state-based updates
- Storybook component added for UI testing

Development Progress and Next Steps

- UI work prioritized for demo today
- Plan to complete API integration after UI
- Awaiting API readiness and dev branch merge
- Progress on UI display of saved configs ongoing
- Team to ping if APIs unavailable for faster resolution
