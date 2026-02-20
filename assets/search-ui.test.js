'use strict';

const { excerptedString, getThumbnail, displayResult } = require('./search-ui.js');

// ---------------------------------------------------------------------------
// excerptedString
// ---------------------------------------------------------------------------

describe('excerptedString', () => {
  describe('when given a null or absent value', () => {
    it('should return an empty string when passed null', () => {
      expect(excerptedString(null)).toBe('');
    });

    it('should return an empty string when passed undefined', () => {
      expect(excerptedString(undefined)).toBe('');
    });

    it('should return an empty string when passed no argument', () => {
      expect(excerptedString()).toBe('');
    });
  });

  describe('when given an empty string', () => {
    it('should return an empty string', () => {
      expect(excerptedString('')).toBe('');
    });
  });

  describe('when the string is shorter than 40 characters', () => {
    it('should return the string unchanged for a single character', () => {
      expect(excerptedString('a')).toBe('a');
    });

    it('should return the string unchanged for a typical short value', () => {
      const short = 'Hello, world!';
      expect(excerptedString(short)).toBe('Hello, world!');
    });

    it('should return the string unchanged when length is 39', () => {
      // 39 'x' characters — below the threshold
      const str = 'x'.repeat(39);
      expect(excerptedString(str)).toBe(str);
    });
  });

  describe('when the string is exactly 40 characters', () => {
    // NOTE: The condition is `str.length < 40`, so a 40-character string is
    // NOT less than 40 and will therefore be truncated. This may be surprising
    // since the first 40 characters are taken and then " ..." is appended,
    // meaning no characters are actually omitted — only the suffix is added.
    it('should truncate and append " ..." even though no characters are lost', () => {
      const str = 'x'.repeat(40);
      expect(excerptedString(str)).toBe(`${'x'.repeat(40)} ...`);
    });
  });

  describe('when the string is longer than 40 characters', () => {
    it('should return only the first 40 characters followed by " ..."', () => {
      const str = 'a'.repeat(80);
      expect(excerptedString(str)).toBe(`${'a'.repeat(40)} ...`);
    });

    it('should truncate mid-word and preserve the leading 40 characters exactly', () => {
      // Ensure the cut happens at character 40, not at a word boundary
      const str = 'The quick brown fox jumps over the lazy dog';
      // 'The quick brown fox jumps over the lazy' is 39 chars, so char 40 is ' '
      expect(excerptedString(str)).toBe('The quick brown fox jumps over the lazy  ...');
    });

    it('should preserve leading whitespace within the first 40 characters', () => {
      const str = '   ' + 'a'.repeat(50);
      expect(excerptedString(str)).toBe('   ' + 'a'.repeat(37) + ' ...');
    });
  });
});

// ---------------------------------------------------------------------------
// getThumbnail
// ---------------------------------------------------------------------------

describe('getThumbnail', () => {
  const BASE_URL = 'https://example.com/';

  describe('when the item has a thumbnail property', () => {
    it('should return an img tag with the combined url and thumbnail path', () => {
      const item = { thumbnail: 'images/thumb.jpg' };
      const result = getThumbnail(item, BASE_URL);
      expect(result).toBe(
        "<img class='sq-thumb-sm' src='https://example.com/images/thumb.jpg'/>&nbsp;&nbsp;&nbsp;"
      );
    });

    it('should concatenate the url and thumbnail directly without extra slashes', () => {
      const item = { thumbnail: 'path/to/image.png' };
      const result = getThumbnail(item, 'https://example.com');
      // url has no trailing slash; the result should concatenate as-is
      expect(result).toContain("src='https://example.compath/to/image.png'");
    });

    it('should include the correct CSS class', () => {
      const item = { thumbnail: 'img.jpg' };
      expect(getThumbnail(item, BASE_URL)).toContain("class='sq-thumb-sm'");
    });

    it('should include the non-breaking space padding after the image', () => {
      const item = { thumbnail: 'img.jpg' };
      expect(getThumbnail(item, BASE_URL)).toContain('&nbsp;&nbsp;&nbsp;');
    });

    it('should work when thumbnail is an empty string', () => {
      // The property exists on the item, so the branch is taken
      const item = { thumbnail: '' };
      const result = getThumbnail(item, BASE_URL);
      expect(result).toBe(
        `<img class='sq-thumb-sm' src='${BASE_URL}'/>&nbsp;&nbsp;&nbsp;`
      );
    });
  });

  describe('when the item does not have a thumbnail property', () => {
    it('should return an empty string', () => {
      const item = { label: 'Some Item' };
      expect(getThumbnail(item, BASE_URL)).toBe('');
    });

    it('should return an empty string for an empty object', () => {
      expect(getThumbnail({}, BASE_URL)).toBe('');
    });

    it('should return an empty string even when thumbnail is set to undefined via explicit key absence', () => {
      // Object.create is used to confirm that "in" checks the prototype chain,
      // but a plain object without the key should still return ''
      const item = { label: 'No thumbnail here' };
      expect(getThumbnail(item, BASE_URL)).toBe('');
    });
  });
});

// ---------------------------------------------------------------------------
// displayResult
// ---------------------------------------------------------------------------

describe('displayResult', () => {
  const BASE_URL = 'https://example.com/';

  // A fully-populated item used as the baseline for most tests
  const fullItem = {
    pid:       'obj001',
    label:     'A Portrait',
    permalink: 'collection/obj001',
    thumbnail: 'thumbnails/obj001.jpg',
    Date:      '1923',
    Artist:    'Jane Doe',
  };

  describe('when the item is fully populated', () => {
    it('should wrap the result in a div with class "result"', () => {
      const result = displayResult(fullItem, ['Date', 'Artist'], BASE_URL);
      expect(result).toMatch(/^<div class="result">/);
      expect(result).toMatch(/<\/div>$/);
    });

    it('should link to the combined url and permalink', () => {
      const result = displayResult(fullItem, [], BASE_URL);
      expect(result).toContain(`href="${BASE_URL}${fullItem.permalink}"`);
    });

    it('should render the label inside a span with class "title"', () => {
      const result = displayResult(fullItem, [], BASE_URL);
      expect(result).toContain(`<span class="title">${fullItem.label}</span>`);
    });

    it('should include the thumbnail img tag when the item has a thumbnail', () => {
      const result = displayResult(fullItem, [], BASE_URL);
      expect(result).toContain("<img class='sq-thumb-sm'");
      expect(result).toContain(`src='${BASE_URL}${fullItem.thumbnail}'`);
    });

    it('should render matched fields as bold labels followed by the field value', () => {
      const result = displayResult(fullItem, ['Date', 'Artist'], BASE_URL);
      expect(result).toContain('<b>Date:</b> 1923');
      expect(result).toContain('<b>Artist:</b> Jane Doe');
    });

    it('should join multiple meta fields with " | "', () => {
      const result = displayResult(fullItem, ['Date', 'Artist'], BASE_URL);
      expect(result).toContain('<b>Date:</b> 1923 | <b>Artist:</b> Jane Doe');
    });

    it('should truncate long field values via excerptedString', () => {
      const longValue = 'a'.repeat(60);
      const item = { ...fullItem, Description: longValue };
      const result = displayResult(item, ['Description'], BASE_URL);
      expect(result).toContain(`<b>Description:</b> ${'a'.repeat(40)} ...`);
    });
  });

  describe('when the item has no label', () => {
    // BUG NOTE: The function builds a `label` variable with the fallback
    //   `var label = item.label || 'Untitled';`
    // but the return template uses `item.label` directly, not the `label`
    // variable. As a result, when item.label is undefined, the title span
    // renders the string "undefined" rather than "Untitled".
    // The tests below document the ACTUAL (buggy) behavior so that any fix
    // will cause them to fail, prompting a conscious update.
    it('should render "undefined" in the title span because the label variable is not used in the template', () => {
      const itemNoLabel = {
        pid:       'obj002',
        permalink: 'collection/obj002',
      };
      const result = displayResult(itemNoLabel, [], BASE_URL);
      expect(result).toContain('<span class="title">undefined</span>');
    });
  });

  describe('when fields contains keys not present on the item', () => {
    it('should silently omit fields that are not in the item', () => {
      const result = displayResult(fullItem, ['NonExistentField'], BASE_URL);
      expect(result).not.toContain('NonExistentField');
    });

    it('should only render fields that exist on the item', () => {
      const result = displayResult(fullItem, ['Date', 'NonExistentField', 'Artist'], BASE_URL);
      expect(result).toContain('<b>Date:</b>');
      expect(result).toContain('<b>Artist:</b>');
      expect(result).not.toContain('NonExistentField');
    });
  });

  describe('when the fields array is empty', () => {
    it('should render an empty meta span', () => {
      const result = displayResult(fullItem, [], BASE_URL);
      expect(result).toContain('<span class="meta"></span>');
    });
  });

  describe('when the item has no thumbnail', () => {
    it('should render no img tag in the output', () => {
      const itemNoThumb = {
        pid:       'obj003',
        label:     'A Painting',
        permalink: 'collection/obj003',
      };
      const result = displayResult(itemNoThumb, [], BASE_URL);
      expect(result).not.toContain('<img');
    });
  });

  describe('when a field value is null or empty', () => {
    it('should render the field label with an empty value when the field exists but is null', () => {
      // excerptedString handles null by converting it to ''
      const item = { ...fullItem, Date: null };
      const result = displayResult(item, ['Date'], BASE_URL);
      expect(result).toContain('<b>Date:</b> ');
    });

    it('should render the field label with an empty value when the field value is an empty string', () => {
      const item = { ...fullItem, Date: '' };
      const result = displayResult(item, ['Date'], BASE_URL);
      expect(result).toContain('<b>Date:</b> ');
    });
  });

  describe('HTML structure', () => {
    it('should place the thumbnail before the paragraph tag', () => {
      const result = displayResult(fullItem, [], BASE_URL);
      const thumbIndex = result.indexOf('<img');
      const paraIndex  = result.indexOf('<p>');
      expect(thumbIndex).toBeLessThan(paraIndex);
    });

    it('should place the title before the meta span', () => {
      const result = displayResult(fullItem, ['Date'], BASE_URL);
      const titleIndex = result.indexOf('class="title"');
      const metaIndex  = result.indexOf('class="meta"');
      expect(titleIndex).toBeLessThan(metaIndex);
    });
  });
});
