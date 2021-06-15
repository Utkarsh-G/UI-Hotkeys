Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {
    if (!game.modules.get('lib-df-hotkeys')?.active) {
		console.error('Missing lib-df-hotkeys module dependency');
		if (game.user.isGM)
			ui.notifications.error("'My Module' requires the 'Library: DF Hotkeys' module. Please install and activate this dependency.");
		// Perform alternative code to handle missing library
		return;
	}
    
    console.log("Successfully Loaded Dragon Flagon's Brew")

	// Perform your Hotkey registrations
    /* Hotkeys.registerShortcut(config: HotkeySetting): void */
	
	const TOKEN_TOOL = 'token';

	// missing info in the readme w.r.t. js 
	game.settings.register("UI-Hotkeys", TOKEN_TOOL, {
		scope: 'world',
		config: false,
		default: {
			key: Hotkeys.keys.KeyQ,
			alt: false,
			ctrl: false,
			shift: false
		}
	});

	Hotkeys.registerShortcut({
		name: 'UI-Hotkeys.token', // <- Must be unique
		label: 'UI-Hotkeys.token',
		get: () => game.settings.get('UI-Hotkeys', `${TOKEN_TOOL}`),
		set: async value => await game.settings.set('UI-Hotkeys', `${TOKEN_TOOL}`, value),
		default: () => { return { key: Hotkeys.keys.KeyQ, alt: false, ctrl: false, shift: false }; },
		onKeyDown: self => { ui.controls._onClickLayer({ preventDefault: () => { }, currentTarget: { dataset: { control: "token" } } }) },
	});


});
