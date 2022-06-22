const fragment = `
precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform vec4 filterArea;
uniform sampler2D uSampler;

uniform float angle;
uniform float scale;

float pattern()
{
   float s = sin(angle), c = cos(angle);
   vec2 tex = vTextureCoord * filterArea.xy;
   vec2 point = vec2(
       c * tex.x - s * tex.y,
       s * tex.x + c * tex.y
   ) * scale;
   return (sin(point.x) * sin(point.y)) * 0.8;
}

void main()
{
   vec4 color = texture2D(uSampler, vTextureCoord);
   gl_FragColor = vec4(color.rgb * 1.2 * (1.0 - pattern()), color.a);
}
`

const vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`

export default class DotFilter extends PIXI.Filter 
{
    constructor(scale = 1, angle = 5)
    {
        super(vertex, fragment);
        this.scale = scale;
        this.angle = angle;
    }

    get scale()
    {
        return this.uniforms.scale;
    }
    set scale(value)
    {
        this.uniforms.scale = value;
    }

    get angle()
    {
        return this.uniforms.angle;
    }
    set angle(value)
    {
        this.uniforms.angle = value;
    }
}
