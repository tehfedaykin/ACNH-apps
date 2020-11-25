import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from "@stencil/core";

export enum PopoverState {
  Init = 'init',
  Open = 'open',
  Close = 'close',
}

export enum InputState {
  default = 'default',
  error = 'error'
}

@Component({
  tag: 'nook-dropdown',
  styleUrl: 'nook-dropdown.css',
  shadow: true,
})
export class NookDropdown {
   /**
     * Private Variables
     */
    private dropdownMenuId = `apui-wc-dropdown-`;
    private value;

    /**
     * The id of the dropdown
     */
    @Prop({ reflect: true }) name: string = this.dropdownMenuId;

    /**
     *
    */
    @Prop({ reflect: true }) placeholder = '';

    /**
     * Property for menu item checkbox select
     */
    @Prop({ reflect: true }) menuSelect = false;

    /**
     * List of menuItems
     */
    @Prop() menuList: any[] = [{ value: {}, displayValue: '' }];

    /**
     * SelectedItem
     */
    @Prop({ reflect: true, mutable: true }) selectedItem: {};

    /**
     * Property to close dropdown on selection, defaults to true
     */
    @Prop({ reflect: true }) closeOnSelection = true;

    /**
     * Property to pass in custom template for their list
     */
    @Prop({ reflect: true }) customList = false;

    /**
     * Emitted when a click event happens on trigger
     */
    @Event() dropdownAnchorEvent: EventEmitter<any>;

    /**
     * Emitted when a click event happens on trigger
     */
    @Event() selectionEvent: EventEmitter<any>;

    /**
     * State that controls the state of the popover, defaults to init
     */
    @State() popoverState: PopoverState = PopoverState.Init;


    /**
     * The state of the Input i.e. default, disabled
     */
    @Prop({ reflect: true }) state: InputState = 'default';

    @Element() dropdownEl: HTMLElement;

    @Watch('selectedItem')
    handleShowChange(newValue: DropdownMenuItem, oldValue: DropdownMenuItem) {
        if (newValue !== oldValue) {
            this.value = newValue.displayValue;
        }
    }

    /**
     *Listen Event for clicks outside the popover
     */
    @Listen('click', { target: 'window' })
    windowClickHandler(ev) {
        const isClickInside = this.dropdownEl.contains(ev.target);

        if (!isClickInside && this.popoverState === PopoverState.Open) {
            this.closeDropdown();
        }
    }

    @Listen('selectionEvent', { capture: true })
    selectionEventHandler(data) {
        this.selectedItem = data.detail.menuItem;
        if (this.closeOnSelection) {
            this.closeDropdown();
        }
    }


    /**
     * Private Method Handlers for Local State Manipulation and Event Transmitting
     */
    private closeDropdown() {
        this.popoverState = PopoverState.Close;
        // the popover animation requires an init -> open -> close -> init flow
        // the timeout lets the close animation complete before setting the state back to init
        setTimeout(
            function () {
                this.popoverState = PopoverState.Init;
            }.bind(this),
            600
        );
    }

    private openDropdown() {
        this.popoverState = PopoverState.Open;
    }

    /**
     * Method for triggering opens and closes
     */
    private handleAnchorClick = () => {
        this.popoverState === PopoverState.Open ? this.closeDropdown() : this.openDropdown();
    }

    private handleSelection(menuItem: DropdownMenuItem, event: Event) {
        this.selectionEvent.emit({ event, menuItem });
    }

    render() {
        return (
            <Host aria-disabled={this.state === 'disabled' ? 'true' : null}>
                <div
                    class={`
                form-input
                form-input--text
                form-input--dropdown
                form-input--${this.state}
                ${this.popoverState === 'open' ? ' form-input--open' : ''}`}>
                    <input
                        type="text"
                        readonly="readonly"
                        class="form-input__target"
                        id={this.dropdownMenuId}
                        onClick={this.handleAnchorClick}
                        placeholder={this.placeholder}
                        value={this.value} />
                    <label class="form-input__label">
                        <span class="form-input__label__symbol">
                            <span class="icon icon--16" innerHTML={Icons["chevronDown"]}> </span>
                        </span>
                    </label>
                    <div class={`popover popover--${this.popoverState}`}>
                        <div class="popover__container">
                            {/*// <!--OPTIONAL HEADER -->*/}
                            <div class="popover__container__header">
                                <slot name="header"></slot>
                            </div>
                            {/*// <!-- REQUIRED CONTENT-->*/}
                            <div class="popover__container__content">
                                {/*// <!-- MENU-LIST ELEMENT -->*/}
                                {this.customList ? (
                                    <slot name="customList"></slot>
                                ) : (
                                        <ul class="menu">
                                            {this.menuList &&
                                                this.menuList.map((menuItem: DropdownMenuItem) => {
                                                    return (
                                                        <li
                                                            class="menu__item"
                                                            onClick={(event) =>
                                                                this.handleSelection(menuItem, event)
                                                            }>
                                                            {/* @TODO refactor to use new checkbox component */}
                                                            {this.menuSelect && (
                                                                <span class="menu__item__status">
                                                                    <span
                                                                        class="icon icon--16"
                                                                        innerHTML={Icons["radioButtonCenter"]}
                                                                    > </span>
                                                                </span>
                                                            )}
                                                            <span class="menu__item__label">
                                                                {menuItem.displayValue}
                                                            </span>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    )}
                            </div>
                            <div class="popover__container__footer">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }

}
