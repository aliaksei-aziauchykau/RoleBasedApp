import { Singleton } from "./decorators/singleton.decorator";

@Singleton()
export class ComponentLoader {

    loadComponent(module, config) {
        const refs = this.defineRefComponents(module, config);
        const components = this.createComponents(module, config, refs);
        return components;
    }

    defineRefComponents(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
    
        this.checkProperty("selector", module.selector, module);
        this.checkProperty("pref", config.pref, config);
        this.checkProperty("store", config.store, config);

        const refs = config.pref.getElementsByTagName(module.selector);
        return refs;
    }

    createComponents(module, config, refs) {
        let components = [];
        for(let ref of refs) {
            const component = this.createComponent(module, config, ref);
            components.push(component);
        }
        return components;
    }

    createComponent(module, config, ref) {
        let component = new module();
        Object.assign(config, {ref})
        component.buildComponent(config);

        return component;
    }

    checkProperty(propertyName, value, object) {
        const message = `The component doesn't provide property: ${propertyName}`;
        if(!Boolean(value)) {
            throw new Error(message, object);
        }
    }
}