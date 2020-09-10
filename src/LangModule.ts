import { random_element, unzip } from "./util";

export class Fragment {
    fragment_template: string;
    meaning_template: string;

    constructor(fragment_template: string, meaning_template: string) {
        this.fragment_template = fragment_template;
        this.meaning_template = meaning_template;
    }

    populate(vocabulary: { [pattern: string]: Array<[string, string]> }): [string, string] {
        let fragment = this.fragment_template.slice();
        let meaning = this.meaning_template.slice();
        //console.log(fragment);
        let i = 1;
        for (let m of this.fragment_template.matchAll(/\{\{.+?}}/g)) {
            if (m) {
                let token = m[0];
                console.log(token);
                if (token in vocabulary && vocabulary[token].length > 0) {
                    let [vocab, vocab_meaning] = random_element(vocabulary[token]);
                    console.log(vocab);
                    fragment = fragment.replace(token, vocab);
                    meaning = meaning.replace(new RegExp("\\{\\{" + i + "}}", "g"), vocab_meaning);
                }
            }
            i += 1;
        }
        //console.log(fragment);
        return [fragment, meaning];
    }
}

export class LangModuleMask {
    enabled: Array<boolean>;
    fragments: Array<boolean>;
    vocabulary: Array<boolean>;

    constructor(enabled: Array<boolean>, fragments: Array<boolean>, vocabulary: Array<boolean>) {
        this.enabled = enabled;
        this.fragments = fragments;
        this.vocabulary = vocabulary;
    }
}

export class LangModule {
    name: string;
    fragments: Array<Fragment>; // with weight
    vocabulary: { [pattern: string]: Array<[string, string]> };
    indices: Array<number>;

    constructor(
        name: string,
        fragments: Array<Fragment>,
        vocabulary: { [pattern: string]: Array<[string, string]> },
        indices: Array<number>
    ) {
        this.name = name;
        this.fragments = fragments;
        this.vocabulary = vocabulary;
        this.indices = indices;
    }

    static empty(): LangModule {
        return new LangModule("Empty", [], {}, []);
    }

    static unzip_fragments(
        json_fragments: Array<[string, string, number?]>
    ): [Array<Fragment>, Array<number>] {
        let fragments = [];
        let weights = [];
        for (let t of json_fragments) {
            fragments.push(new Fragment(t[0], t[1]));
            if (t[2]) {
                weights.push(t[2]);
            } else {
                weights.push(1);
            }
        }
        return [fragments, weights];
    }

    static from_json(json: any): LangModule {
        let name = json.name;
        unzip(json.fragments);
        let [fragments, weights] = LangModule.unzip_fragments(json.fragments);
        let vocabulary = json.vocabulary;
        let indices: Array<number> = [];
        weights.forEach((w, i) => {
            [...Array(w).keys()].forEach(() => {
                indices.push(i);
            });
        });
        return new LangModule(name, fragments, vocabulary, indices);
    }

    static join(modules: Array<LangModule>, mask: LangModuleMask): LangModule {
        let res = LangModule.empty();
        modules.forEach((m, i) => {
            if (mask.enabled[i]) {
                if (mask.fragments[i]) {
                    let shift = res.indices.length > 0 ? res.indices[res.indices.length - 1] : 0;
                    res.fragments = res.fragments.concat(m.fragments);
                    for (let j of m.indices) {
                        res.indices.push(j + shift);
                    }
                }
                if (mask.vocabulary[i]) {
                    for (let [p, c] of Object.entries(m.vocabulary)) {
                        if (p in res.vocabulary) {
                            res.vocabulary[p] = res.vocabulary[p].concat(c);
                        } else {
                            res.vocabulary[p] = c;
                        }
                    }
                }
            }
        });
        return res;
    }

    random_with_vocabulary(vocabulary: { [pattern: string]: Array<[string, string]> }): [string, string] {
        if (this.fragments.length > 0) {
            let i: number = random_element(this.indices);
            let s: Fragment = this.fragments[i];
            return s.populate(vocabulary);
        } else {
            return ["...", "..."];
        }
    }

    random(): [string, string] {
        return this.random_with_vocabulary(this.vocabulary);
    }
}
