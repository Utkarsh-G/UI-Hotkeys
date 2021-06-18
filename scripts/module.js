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
    
    console.log("UI-Hotkeys | Successfully Loaded Dragon Flagon's hotkeys library")

	// Perform your Hotkey registrations

	controls = [
		{ control: "token", key: Hotkeys.keys.KeyT},
		{ control: "measure", key: Hotkeys.keys.KeyM},
		{ control: "tiles", key: Hotkeys.keys.KeyI},
		{ control: "drawings", key: Hotkeys.keys.KeyD},
		{ control: "walls", key: Hotkeys.keys.KeyW},
		{ control: "lighting", key: Hotkeys.keys.KeyL},
		{ control: "sounds", key: Hotkeys.keys.KeyA},
		{ control: "notes", key: Hotkeys.keys.KeyN},
	]

	//registerKeyAndShortcut( { control: "measure", key: Hotkeys.keys.KeyM } );
	controls.forEach(registerKeyAndShortcut)

	console.log("UI-Hotkeys | Completed Hotkey Registration for controls UI")

	//register sub menu keys
	let index = 1

	let key = Hotkeys.keys.Digit1

	game.settings.register("UI-Hotkeys", `tool${index}`, {
		scope: 'world',
		config: false,
		default: {
			key: key,
			alt: true,
			ctrl: false,
			shift: false
		}
	});

	Hotkeys.registerShortcut({
		name: `UI-Hotkeys.tool${index}`, // <- Must be unique
		label: `Select tool #${index}`,
		get: () => game.settings.get('UI-Hotkeys', `tool${index}`),
		set: async value => await game.settings.set('UI-Hotkeys', `tool${index}`, value),
		default: () => { return { key: key, alt: true, ctrl: false, shift: false }; },
		onKeyDown: self => { 
			//ui.controls._onClickLayer({ preventDefault: () => { }, currentTarget: { dataset: { control: control } } }) 
			let tool_name = ui.controls.controls.find(control => control.name === ui.controls.activeControl).tools[index-1].name
		
			if (typeof tool_name !== 'undefined') {
				ui.controls._onClickTool({ preventDefault: () => { }, currentTarget: { dataset: { tool: tool_name } } })
			}
			else 
			{
				console.log("No tool exists at that index")
			}
		},
	});

});

function registerKeyAndShortcut( { control, key } ) {
	game.settings.register("UI-Hotkeys", control, {
		scope: 'world',
		config: false,
		default: {
			key: key,
			alt: false,
			ctrl: false,
			shift: false
		}
	});

	Hotkeys.registerShortcut({
		name: `UI-Hotkeys.${control}`, // <- Must be unique
		label: `Select ${control} controls`,
		get: () => game.settings.get('UI-Hotkeys', `${control}`),
		set: async value => await game.settings.set('UI-Hotkeys', `${control}`, value),
		default: () => { return { key: key, alt: false, ctrl: false, shift: false }; },
		onKeyDown: self => { ui.controls._onClickLayer({ preventDefault: () => { }, currentTarget: { dataset: { control: control } } }) },
	});
}