"use strict";

class PageFilterBackgrounds extends PageFilter {
	constructor () {
		super();

		this._traitsFilter = new TraitsFilter({header: "Traits"})
		this._skillFilter = new Filter({header: "Skill Proficiencies", displayFn: (it) => it.toTitleCase()});
		this._loreFilter = new Filter({header: "Lore Proficiencies", displayFn: (it) => it.toTitleCase()});
		this._boostFilter = new Filter({
			header: "Ability Boosts",
			items: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "Free"],
			itemSortFn: null,
		});
		this._featFilter = new Filter({header: "Feats", displayFn: (it) => it.toTitleCase()});
		this._abilityFilter = new Filter({
			header: "Miscellaneous",
			items: ["Gives Ability"],
		});
	}

	mutateForFilters (bg) {
		bg._fSources = SourceFilter.getCompleteFilterSources(bg);
		bg._fTraits = (bg.traits || []).map(t => Parser.getTraitName(t));
		bg._fAbility = [];
		if (bg.ability === true) bg._fAbility.push("Gives Ability");
	}

	addToFilters (bg, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(bg._fSources);
		this._traitsFilter.addItem(bg._fTraits);
		this._skillFilter.addItem(bg.skills);
		this._loreFilter.addItem(bg.lore);
		this._boostFilter.addItem(bg.boosts);
		this._featFilter.addItem(bg.feat);
		this._abilityFilter.addItem(bg._fAbility);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._traitsFilter,
			this._boostFilter,
			this._skillFilter,
			this._loreFilter,
			this._featFilter,
			this._abilityFilter,
		];
	}

	toDisplay (values, bg) {
		return this._filterBox.toDisplay(
			values,
			bg._fSources,
			bg._fTraits,
			bg.boosts,
			bg.skills,
			bg.lore,
			bg.feat,
			bg._fAbility,
		)
	}
}
