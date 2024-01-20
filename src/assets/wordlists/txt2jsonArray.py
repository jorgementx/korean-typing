
def txt2jsonArray(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    lines = [line.strip() for line in lines]
    lines = [line for line in lines if line]
    return lines


if __name__ == '__main__':
    import sys
    import json
    filename = sys.argv[1]
    lines = txt2jsonArray(filename)
    output_content = json.dumps(lines, indent=2, ensure_ascii=False)
    output_filename = filename.replace('.txt', '.js')
    with open(output_filename, 'w') as f:
        f.write('const wordlist =')
        f.write(output_content)
        f.write('''

export default wordlist;''')
    