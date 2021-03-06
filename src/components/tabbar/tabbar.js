import View from '../../lib/view';
import ViewManager from '../../lib/view-manager';

export default class TabBar extends View {
    constructor() {
        super();

        this.vm = null;

        /**
         * @type {!Array.<!View>}
         */
        this.views = [];
    }

    /**
     * @export
     *
     * @override
     */
    onAfterRender() {
        this.vm = new ViewManager(this.el);
    };

    /**
     * @export
     *
     * @param {!{targetEl: !Element}} e Item touch event handler.
     */
    onItemTap(e) {
        var activeItem = this.$(this.mappings.ACTIVE);
        if (activeItem && activeItem == e.targetEl) return;

        var items = this.$(this.mappings.ITEMS);
        var itemIndex = [].indexOf.call(items && items.children, e.targetEl);

        this.activateItem(itemIndex);
    };

    /**
     * @export
     *
     * Adds active class to item.
     * @param {number} index Index of the item to be active.
     */
    activateItem(index) {
        if (index == -1) return;

        this.deactivateActiveItem();
        var item = this.$$(this.mappings.ITEM)[index];
        item && item.classList.add('active');

        if (this.views && this.views[index])
            this.vm.setCurrentView(this.views[index], true);
    };



    /**
     * @export
     *
     * Activates a tab bar item with a given name. If an item for the given the name isn't found, does nothing.
     *
     * @param {string} name Name for the tab bar item.
     */
    activateItemByName(name) {
        var child = this.$(this.mappings.ITEM + '[data-view=' + name + ']');
        if (!child) return;

        var items = this.$(this.mappings.ITEMS);
        var itemIndex = [].indexOf.call(items && items.children, child);

        this.activateItem(itemIndex);
    };


    /**
     * @export
     *
     * Removes active class of active item.
     */
    deactivateActiveItem() {
        var activeItem = this.$(this.mappings.ACTIVE);
        activeItem && activeItem.classList.remove('active');
    };



    /**
     * @export
     *
     * @return {string} Base template of NavigationBar component.
     */
    template_content() {
        return `
        ${this.template_views()}
<tab-bar>
    <tab-items>
        ${this.template_items()}
    </tab-items>
</tab-bar>
`;
    };

    template_views() {
        return this.views.join('');
    }

    /**
     * @export
     *
     * @return {string} Template for tab bar items.
     */
    template_items() {
        return '';
    };

    /**
     * @export
     *
     * @enum {string} Dom mappings.
     */
    get mappings() {
        return {
            ITEM: 'tab-item',
            ITEMS: 'tab-items',
            ACTIVE: '.active'
        };
    }

    /**
     * @export
     */
    get events() {
        return {
            'touchend': {
                [this.mappings.ITEM]: this.onItemTap.bind(this)
            }
        }
    }
}
